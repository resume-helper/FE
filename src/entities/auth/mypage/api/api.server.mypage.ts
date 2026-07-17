import { BACKEND_API } from "@/shared/api/api.server.instance";

/** 내 정보 + 연결 소셜계정 (BE: GET /api/auth/me) */
export async function API_SERVER_MYPAGE_ME() {
  const api = await BACKEND_API("auth/me");
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  const response = await api.json<RESPONSE_MODEL<USER_ME_MODEL>>();
  return response["data"];
}

/** 회원 탈퇴 (BE: DELETE /api/auth/withdraw?provider=) — 30일 보관 후 영구 삭제 */
export async function API_SERVER_MYPAGE_WITHDRAW(provider: SOCIAL_PROVIDER) {
  const api = await BACKEND_API("auth/withdraw", {
    method: "delete",
    searchParams: { provider },
  });
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  return { success: true };
}
