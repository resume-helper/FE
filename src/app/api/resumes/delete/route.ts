import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_RESUMSES_DELETE } from "@/entities/resumes/delete/api/api.server.resumes.delete";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST(req: NextRequest) {
  try {
    const ids = (await req.json()) as number[];

    const result = await API_SERVER_RESUMSES_DELETE(ids);

    /** api 통신 실패 */
    if (result["success"]) {
      return NextResponse.json(result["success"], { status: 200 });
    } else {
      /** accessToken 토큰 만료 */
      if (result["code"] === "UNAUTHORIZED") {
        const isRefresh = await API_SERVER_REFRESH();

        /** accessToken 갱신 성공 */
        if (isRefresh.success) {
          const retry = await API_SERVER_RESUMSES_DELETE(ids);

          return NextResponse.json(retry["success"], { status: 200 });
        } else {
          /** refreshToken 만료 (로그아웃) */
          return NextResponse.json({ status: 500 });
        }
      } else {
      /** 토큰 만료 외 에러 */
        console.log(result, "토큰 만료 외 에러");
        return NextResponse.json(false, { status: 200 });
      }
    }
  } catch (err) {
    console.log(err, "알수없는 에러");
    return NextResponse.json([], { status: 200 });
  }
}
