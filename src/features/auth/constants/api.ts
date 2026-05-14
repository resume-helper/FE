const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

// 소셜 로그인
export const OAUTH_ENDPOINT = (provider: string) =>
  `${SERVER_URL}/oauth2/authorization/${provider}?redirect_uri=${REDIRECT_URI}`;

export const AUTH_ENDPOINTS = {
  // Access Token 갱신
  refresh: "/auth/refresh",
  // 로그아웃
  logout: "/auth/logout",
  // 내 정보 조회
  me: "/auth/me",
} as const;
