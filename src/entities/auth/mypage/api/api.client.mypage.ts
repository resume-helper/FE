import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_MYPAGE_ME() {
  return CLIENT_API("auth/me", { json: {} }).json<USER_ME_MODEL>();
}

export async function API_CLIENT_MYPAGE_WITHDRAW(provider: SOCIAL_PROVIDER) {
  return CLIENT_API("auth/withdraw", { json: { provider } }).json<{
    success: boolean;
  }>();
}
