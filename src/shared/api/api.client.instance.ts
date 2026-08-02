"use client";

import ky from "ky";

export const CLIENT_API = ky.create({
  prefix: "/api",
  method: "post",
  credentials: "include",
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        return request;
      },
    ],
    beforeError: [
      // ky HTTPError 는 응답 본문을 노출하지 않는다. onError 등에서 BE 실패
      // 사유(code·message)를 쓸 수 있도록 파싱된 본문을 error 에 부착한다.
      async ({ error }) => {
        const httpError = error as { response?: Response } & Error;
        try {
          if (httpError.response) {
            (error as unknown as { responseBody?: unknown }).responseBody =
              await httpError.response.clone().json();
          }
        } catch {
          // JSON 이 아니거나 본문이 없는 경우 — 무시
        }
        return error;
      },
    ],

    afterResponse: [
      async ({ response }) => {
        return response;
      },
    ],
  },
});
