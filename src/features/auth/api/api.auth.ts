import { ApiLoginOAuth_params } from "@/shared/types/api";

import { SetToken } from "@/shared/lib/token";

export async function ApiLoginOAuth(user: ApiLoginOAuth_params) {
  try {
    const api = await fetch("https://developlife.co.kr/api/auth/social-login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!api.ok) {
      console.log(api.headers, "headers");
      throw await api.json().catch();
    }

    await SetToken(api.headers);

    const response = (await api.json()) as ApiLoginOAuth;

    return response?.success ?? false;
  } catch (err) {
    console.log(err, "auth api error");
    throw err;
  }
}
