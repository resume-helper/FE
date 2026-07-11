import { BACKEND_API } from "@/shared/api/api.server.instance";
import { SetCookies } from "@/shared/lib/cookies";

export async function API_SERVER_SOCIAL_LOGIN(
  param: API_SERVER_SOCIAL_LOGIN_PARAMS
) {
  try {
    const api = await BACKEND_API("auth/social-login", {
      method: "post",
      json: param,
    });

    if (!api.ok) throw api.statusText;

    await SetCookies(api.headers);

    const response = await api.json<API_SERVER_SOCIAL_LOGIN>();

    return response?.success ?? false;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
