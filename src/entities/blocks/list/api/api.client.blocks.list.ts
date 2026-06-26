import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_BLOCKS_LIST(
  params: API_CLIENT_BLOCKS_LIST_PARAMS
) {
  try {
    const result = await CLIENT_API("blocks/list", {
      json: params,
    }).json<API_CLIENT_BLOCKS_LIST>();

    return result;
  } catch (err) {
    throw err;
  }
}
