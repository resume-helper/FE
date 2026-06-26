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
