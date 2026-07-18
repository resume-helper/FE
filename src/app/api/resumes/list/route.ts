import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_RESUMSES_LIST } from "@/entities/resumes/list/api/api.server.resumes.list";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST(req: NextRequest) {
  const { offset, limit, sort, type, keyword } =
    (await req.json()) as API_CLIENT_RESUMSES_LIST_PARAMS;

  try {
    const result = await API_SERVER_RESUMSES_LIST(
      offset,
      limit,
      type,
      sort,
      keyword
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const error = (await err) as API_FAIL_RESPONSE;

    /** accessToken 만료 */
    if (error["code"] === "UNAUTHORIZED") {
      const isRefresh = await API_SERVER_REFRESH();

      /** 갱신 성공 */
      if (isRefresh?.success) {
        const result = await API_SERVER_RESUMSES_LIST(
          offset,
          limit,
          type,
          sort,
          keyword
        );

        return NextResponse.json(result, { status: 200 });
      } else {
        /** 갱신 실패 (refreshToken 만료) */
        // return NextResponse.json({
        //   success : false,
        //   data : [],
        //   message : error["message"]
        // },{ status: 500 });
        return NextResponse.json({ status: 500 });
      }
    } else {
      /**
       * 토큰 외 에러
       *
       * RESUME_NOT_FOUND : 이력서 없음 또는 삭제됨
       * FORBIDDEN : 본인 소유 아닌 이력서 접근
       * VALIDATION_FAILED : 입력값 유효성 오류
       */
      // return NextResponse.json({
      //   success : false,
      //   data : [],
      //   message : error["message"]
      // }, { status: 200 });
      return NextResponse.json([], { status: 200 });
    }
  }
}
