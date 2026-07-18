import type { DefaultSession } from "next-auth";

import "next-auth";
import "next-auth/jwt";

type SOCIAL_TYPE = "GOOGLE" | "NAVER" | "KAKAO";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      name: string;
      profileImageUrl?: string;
    };
  }

  interface User {
    email: string;
    id: string;
    name: string;
    provider: SOCIAL_TYPE;
    profileImageUrl?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    id: string;
    name: string;
    profileImageUrl?: string;
  }
}

export {};
