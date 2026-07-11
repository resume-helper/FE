import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_BLOCKS_ADD(param: API_BLOCKS_ADD_PARAM) {
  const result = await BACKEND_API("blocks", {
    method: "post",
    json: param,
  })
    .json<API_SERVER_BLOCKS_ADD>()
    .catch<API_FAIL_RESPONSE>();

  return result;
}
