import { BACKEND_API } from "@/shared/api/api.server.instance";
import { SetCookiesAccessToken } from "@/shared/lib/cookies";

export async function API_SERVER_REFRESH() {
  const api = await BACKEND_API("auth/refresh", {
    method: "post",
  });

  if (api.ok) await SetCookiesAccessToken(api.headers);

  const result = api.json<API_SERVER_REFRESH>().catch<API_SERVER_REFRESH>();

  return result;
}
