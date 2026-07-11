import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_RESUMSES_LIST } from "@/entities/resumes/list/api/api.server.resumes.list";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST(req: NextRequest) {
  try {
    const { offset, limit, sort, type, keyword } =
      (await req.json()) as API_CLIENT_RESUMSES_LIST_PARAMS;

    const result = await API_SERVER_RESUMSES_LIST(
      offset,
      limit,
      type,
      sort,
      keyword
    );

    /** api 통신 성공 */
    if (result["success"]) {
      return NextResponse.json(result["success"] ? result["data"] : [], {
        status: 200,
      });
    } else {
    /** api 통신 실패 */
      /** accessToken 토큰 만료 */
      if (result["code"] === "UNAUTHORIZED") {
        const isRefresh = await API_SERVER_REFRESH();

        /** accessToken 갱신 성공 */
        if (isRefresh.success) {
          const retry = await API_SERVER_RESUMSES_LIST(
            offset,
            limit,
            type,
            sort,
            keyword
          );

          return NextResponse.json(retry["success"] ? retry["data"] : [], {
            status: 200,
          });
        } else {
          /** refreshToken 만료 (로그아웃) */
          return NextResponse.json({ status: 500 });
        }
      } else {
      /** 토큰 만료 외 에러 */
        console.log(result, "토큰 만료 외 에러");
        return NextResponse.json([], { status: 200 });
      }
    }
  } catch (err) {
    /** 알수없는 에러 */
    console.log(err, "알수없는 에러");

    return NextResponse.json([], { status: 200 });
  }
}
