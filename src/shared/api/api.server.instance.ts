import ky from "ky";
import { GetCookies } from "../lib/cookies";

export const BACKEND_API = ky.create({
  prefix: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  timeout: 10000,
  credentials: "include",
  throwHttpErrors: false,
  headers: {
    accept: "application/json",
  },
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await GetCookies();

        if (token) {
          const isRefresh = request.url.includes("auth/refresh");

          request.headers.set(
            process.env[
              isRefresh ? "REFRESH_TOKEN_KEY" : "ACCESS_TOKEN_KEY"
            ] as string,
            token[isRefresh ? "r" : "a"]
          );
        }

        return request;
      },
    ],

    beforeError: [
      async ({ error }) => {
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
