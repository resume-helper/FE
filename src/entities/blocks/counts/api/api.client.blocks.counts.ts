import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_BLOCKS_COUNTS() {
  try {
    const result =
      await CLIENT_API("blocks/counts").json<API_CLIENT_BLOCKS_COUNTS>();

    return result;
  } catch (err) {
    throw err;
  }
}
