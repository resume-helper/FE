import { BACKEND_API } from "@/shared/api/api.server.instance";

/** 블록 생성 (BE: POST /api/blocks — 배치, 1건 전송) */
export async function API_SERVER_BLOCKS_CREATE(
  blockType: BLOCK_TYPE,
  title: string,
  contentJson: Record<string, unknown>
) {
  const api = await BACKEND_API("blocks", {
    method: "post",
    json: { blocks: [{ blockType, title, contentJson }] },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_SAVE_RESULT[]>>();
  return response["data"][0];
}

/** 블록 수정 (BE: PUT /api/blocks/{id}) */
export async function API_SERVER_BLOCKS_UPDATE(
  blockId: number,
  blockType: BLOCK_TYPE,
  title: string,
  contentJson: Record<string, unknown>
) {
  const api = await BACKEND_API(`blocks/${blockId}`, {
    method: "put",
    json: { blockType, title, contentJson },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_SAVE_RESULT>>();
  return response["data"];
}
