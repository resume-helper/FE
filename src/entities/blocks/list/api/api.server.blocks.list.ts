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

  const result = await BACKEND_API("blocks", {
    searchParams,
  })
    .json<API_SERVER_BLOCKS_LIST>()
    .catch<API_FAIL_RESPONSE>();

  return result;
}
