import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_BLOCKS_ADD(param: API_BLOCKS_ADD_PARAM) {
  try {
    const result = await CLIENT_API("blocks/add", {
      json: param,
    }).json<API_CLIENT_BLOCKS_ADD>();

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
