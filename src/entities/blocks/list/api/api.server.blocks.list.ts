import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_BLOCKS_LIST(
  page: number,
  size: number,
  type?: BLOCK_TYPE
) {
  const searchParams: {
    page: number;
    size: number;
    type?: BLOCK_TYPE;
  } = {
    page,
    size,
  };

  if (type) searchParams["type"] = type;

  const api = await BACKEND_API("blocks", {
    searchParams,
  });

  if (api.status === 401) {
    throw await api.json().catch<API_FAIL_RESPONSE>();
  }

  const response = await api.json<API_SERVER_BLOCKS_LIST>();

  return response["data"];
}

/** 블록 타입별 개수 (BE: GET /api/blocks/counts) */
export async function API_SERVER_BLOCKS_COUNTS() {
  const api = await BACKEND_API("blocks/counts");

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_COUNTS>>();
  return response["data"];
}

/** 블록 삭제 (BE: DELETE /api/blocks/{id}) */
export async function API_SERVER_BLOCKS_DELETE(blockId: number) {
  const api = await BACKEND_API(`blocks/${blockId}`, { method: "delete" });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  return { success: true };
}
