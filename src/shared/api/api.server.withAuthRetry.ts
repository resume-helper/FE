import { NextResponse } from "next/server";

import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

/**
 * BFF 공통 — 백엔드 호출을 실행하고, accessToken 만료(UNAUTHORIZED) 시
 * refresh 후 1회 재시도한다. 그 외 실패는 상태코드와 메시지를 그대로 전달한다.
 */
export async function withAuthRetry<T>(
  call: () => Promise<T>
): Promise<NextResponse> {
  try {
    const result = await call();
    return NextResponse.json(result as object, { status: 200 });
  } catch (err) {
    const error = (await err) as API_FAIL_RESPONSE;

    if (error["code"] === "UNAUTHORIZED") {
      const isRefresh = await API_SERVER_REFRESH();
      if (isRefresh?.success) {
        const result = await call();
        return NextResponse.json(result as object, { status: 200 });
      }
      return NextResponse.json(
        {
          success: false,
          message: "세션이 만료되었습니다. 다시 로그인해주세요.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, code: error["code"], message: error["message"] },
      { status: 400 }
    );
  }
}
