import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_BLOCKS_LIST(type?: BLOCK_TYPE) {
  try {
    const api = await BACKEND_API("blocks", {
      searchParams: {
        type: type ?? "",
      },
    });

    if (!api.ok) {
      const response = (await api.json().catch()) as API_FAIL_RESPONSE;

      return null;
    }

    const result = await api.json<API_SERVER_BLOCKS_LIST>();

    return result["data"];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
