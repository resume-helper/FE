export const AUTH_ENDPOINTS = {
  // Access Token 갱신
  refresh: "/auth/refresh",
  // 로그아웃
  logout: "/auth/logout",
  // 내 정보 조회
  me: "/auth/me",
} as const;
