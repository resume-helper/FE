import type { DefaultSession } from "next-auth";

import "next-auth";
import "next-auth/jwt";

type SocialType = "GOOGLE" | "NAVER" | "KAKAO";

interface AuthUser {
  email: string;
  id: string;
  name: string;
  provider: SocialType;
}

declare module "next-auth" {
  interface Session {
    user: AuthUser & DefaultSession["user"];
  }

  interface User {
    provider: SocialType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: SocialType;
  }
}

export {};
