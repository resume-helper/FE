import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_BLOCKS_ADD } from "@/entities/blocks/add/api/api.server.blocks.add";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST(req: NextRequest) {
  try {
    const param = (await req.json()) as API_BLOCKS_ADD_PARAM;

    const result = await API_SERVER_BLOCKS_ADD(param);

    if (result["success"]) {
      return NextResponse.json(true, { status: 200 });
    } else {
    /** api 통신 실패 */
      /** accessToken 토큰 만료 */
      if (result["code"] === "UNAUTHORIZED") {
        const isRefresh = await API_SERVER_REFRESH();

        /** accessToken 갱신 성공 */
        if (isRefresh.success) {
          const retry = await API_SERVER_BLOCKS_ADD(param);

          return NextResponse.json(retry["success"], {
            status: 200,
          });
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
    console.log(err);
    return NextResponse.json(false, { status: 500 });
  }
}
