import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_ME() {
  try {
    const { success, data, message } = await BACKEND_API("auth/me", {
      method: "get",
    }).json<API_SERVER_ME>();

    if (!success) {
      console.log("error", message);
      return null;
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
