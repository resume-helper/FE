import { type QueryClient } from "@tanstack/react-query";
import { API_SERVER_RESUMSES_LIST } from "../api/api.server.resumes.list";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function PrefetchResumesList(
  queryServer: QueryClient,
  type: "PDF" | "WEB",
  queryStringObj: { sort: SORT_TYPE; keyword?: string }
) {
  await queryServer.prefetchInfiniteQuery({
    queryKey: ["resumes", "list", type, queryStringObj],
    queryFn: async () => {
      const result = await API_SERVER_RESUMSES_LIST(
        1,
        20,
        type,
        queryStringObj["sort"],
        queryStringObj["keyword"]
      );

      /** api 통신 실패 */
      if (!result["success"]) {
        /** accessToken 토큰 만료 */
        if (result["code"] === "UNAUTHORIZED") {
          const isRefresh = await API_SERVER_REFRESH();

          /** accessToken 갱신 성공 */
          if (isRefresh.success) {
            const retry = await API_SERVER_RESUMSES_LIST(1, 20, type, "NEWEST");

            return retry["success"]
              ? (retry["data"] as API_CLIENT_RESUMSES_LIST)
              : null;
          } else {
            /** refreshToken 만료 (로그아웃) */
            return null;
          }
        } else {
        /** 토큰 만료 외 에러 */
          console.log(result, "토큰 만료 외 에러");
          return null;
        }
      }

      return result["success"]
        ? (result["data"] as API_CLIENT_RESUMSES_LIST)
        : null;
    },
    initialPageParam: 1,
    getNextPageParam: (response: API_CLIENT_RESUMSES_LIST | null) => {
      if (!response) return undefined;

      const { page, hasNext } = response;

      return hasNext ? page + 1 : undefined;
    },
  });
}
