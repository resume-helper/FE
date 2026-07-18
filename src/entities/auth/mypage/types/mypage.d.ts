declare global {
  type SOCIAL_PROVIDER = "GOOGLE" | "NAVER" | "KAKAO";

  /** BE SocialAccountResponse (B2 — /api/auth/me 확장) */
  interface SOCIAL_ACCOUNT {
    provider: SOCIAL_PROVIDER;
    isActive: boolean;
    connectedAt: string;
  }

  interface USER_ME_MODEL extends USER_MODEL {
    socialAccounts: SOCIAL_ACCOUNT[];
  }
}

export {};
