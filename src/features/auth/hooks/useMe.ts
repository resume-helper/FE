import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/api/api";
import type { GetMeRes } from "@/features/auth/types/auth";
import { useAuthStore } from "@/features/auth/store/authStore";

export const authKeys = {
  me: ["auth", "me"] as const,
};

// 내 정보 조회
export function useMe() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const hasSession = useAuthStore((s) => s.hasSession);
  const setHasSession = useAuthStore((s) => s.setHasSession);

  // OAuth 로그인 완료 후 리다이렉트 감지
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("oauth") === "success") {
      params.delete("oauth");
      window.history.replaceState({}, "", params.size ? `/?${params}` : "/");
      setHasSession(true);
    }
  }, [setHasSession]);

  const query = useQuery<GetMeRes>({
    queryKey: authKeys.me,
    queryFn: getMe,
    enabled: hasSession,
    retry: false,
  });

  // 응답 결과에 따라 전역 유저 상태 동기화
  useEffect(() => {
    if (query.data) setUser(query.data);
    else if (query.isError) clearUser();
  }, [query.data, query.isError, setUser, clearUser]);

  return query;
}
