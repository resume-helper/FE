import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_BLOCKS_COUNTS() {
  const result = await BACKEND_API("blocks/counts", {
    method: "get",
  })
    .json<API_SERVER_BLOCKS_COUNTS>()
    .catch<API_FAIL_RESPONSE>();

  return result;
}
