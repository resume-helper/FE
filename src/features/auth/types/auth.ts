import type { components } from "@/shared/types/api";

// 소셜 로그인 유형
export type OAuthProvider = "naver" | "kakao" | "google";

// Access Token 갱신 응답
export type PostRefreshRes = components["schemas"]["ApiResponse"];

// 로그아웃 응답
export type PostLogoutRes = components["schemas"]["ApiResponse"];

// 유저 정보 응답
export type UserResponse = components["schemas"]["UserResponse"];

// 내 정보 조회 응답
export type GetMeRes = UserResponse;
