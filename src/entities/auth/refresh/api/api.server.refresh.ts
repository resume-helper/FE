import { HTTPError } from "ky";

import { BACKEND_API } from "@/shared/api/api.server.instance";
import { SetCookiesAccessToken } from "@/shared/lib/cookies";

export async function API_SERVER_REFRESH() {
  try {
    const api = await BACKEND_API("auth/refresh", {
      method: "post",
    });

    if (api.ok) await SetCookiesAccessToken(api.headers);

    return api.json<API_SERVER_REFRESH>().catch<{
      code: string;
      message: string;
    }>();
  } catch (err) {
    if (err instanceof HTTPError) {
      return err.data;
    }
  }
}
