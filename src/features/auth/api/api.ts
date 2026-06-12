import { api } from "@/shared/api/api";
import { AUTH_ENDPOINTS } from "@/features/auth/constants/api";
import type { components } from "@/shared/types/api";
import type {
  GetMeRes,
  PostLogoutRes,
  PostRefreshRes,
} from "@/features/auth/types/auth";

type ApiResponse = components["schemas"]["ApiResponse"];

// Access Token 갱신
export const postRefresh = (): Promise<PostRefreshRes> =>
  api.post<PostRefreshRes>(AUTH_ENDPOINTS.refresh);

// 로그아웃
export const postLogout = (): Promise<PostLogoutRes> =>
  api.post<PostLogoutRes>(AUTH_ENDPOINTS.logout);

// 내 정보 조회
export const getMe = async (): Promise<GetMeRes> => {
  const res = await api.get<ApiResponse>(AUTH_ENDPOINTS.me);
  return res.data as GetMeRes;
};
