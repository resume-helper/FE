import { CLIENT_API } from "@/shared/api/api.client.instance";
import { BACKEND_API } from "@/shared/api/api.server.instance";
import { HTTPError } from "ky";

export async function API_SERVER_RESUMSES_WEB_LIST(
  page: number,
  size: number,
  type: "WEB" | "PDF",
  sort: "NEWEST" | "OLDEST"
) {
  try {
    const api = await BACKEND_API("resumes", {
      searchParams: {
        page,
        size,
        type,
        sort,
      },
    });

    if (!api.ok) {
      const response = (await api.json().catch()) as API_FAIL_RESPONSE;

      return null;
    }

    const result = await api.json<API_SERVER_RESUMSES_WEB_LIST>();

    return result["data"];
  } catch (err) {
    throw err;
  }
}

export async function API_CLIENT_RESUMSES_WEB_LIST(
  params: API_CLIENT_RESUMSES_WEB_LIST_PARAMS
) {
  try {
    const result = await CLIENT_API("resumes/list", {
      json: params,
    }).json<API_CLIENT_RESUMSES_WEB_LIST>();

    return result;
  } catch (err) {
    throw err as API_FAIL_RESPONSE;
  }
}
