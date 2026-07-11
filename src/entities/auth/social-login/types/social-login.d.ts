declare global {
  interface API_SERVER_SOCIAL_LOGIN_PARAMS {
    email: string;
    providerUserId: string;
    name: string;
    provider: "GOOGLE" | "NAVER" | "KAKAO";
  }

  type API_SERVER_SOCIAL_LOGIN = RESPONSE_MODEL<null>;
}

export {};
