import { NextResponse } from "next/server";

import { API_SERVER_BLOCKS_COUNTS } from "@/entities/blocks/counts/api/api.server.blocks.counts";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST() {
  try {
    const result = await API_SERVER_BLOCKS_COUNTS();

    if (result["success"]) {
      return NextResponse.json(result["success"] ? result["data"] : null, {
        status: 200,
      });
    } else {
    /** api 통신 실패 */
      /** accessToken 토큰 만료 */
      if (result["code"] === "UNAUTHORIZED") {
        const isRefresh = await API_SERVER_REFRESH();

        /** accessToken 갱신 성공 */
        if (isRefresh.success) {
          const retry = await API_SERVER_BLOCKS_COUNTS();

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
    console.log(err, "알수없는 에러");
    return NextResponse.json({ status: 500 });
  }
}
