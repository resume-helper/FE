import type { NextAuthOptions } from "next-auth";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { ApiLoginOAuth } from "./features/auth/api/api.auth";

const maxAge = 60 * 60 * 4;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge,
  },
  jwt: {
    maxAge,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      async profile(profile) {
        return {
          email: profile.email /** 이메일 */,
          id: profile.sub /** 고유 식별 값 */,
          name: profile.name /** 이름 */,
          provider: "GOOGLE" /** social login type */,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,

      async profile(profile) {
        const kakaoProfile = profile.kakao_account?.profile;

        return {
          email: kakaoProfile.email /** 이메일 */,
          id: kakaoProfile.id /** 고유 식별 값 */,
          name: kakaoProfile.name /** 이름 */,
          provider: "KAKAO" /** social login type */,
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,

      async profile(profile) {
        const r = profile.response;
        return {
          email: r.email /** 이메일 */,
          id: r.id /** 고유 식별 값 */,
          name: r.name /** 이름 */,
          provider: "NAVER" /** social login type */,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const isLoginSuccess = await ApiLoginOAuth({
          provider: user.provider,
          providerUserId: user.id,
          email: user.email as string,
          name: user.name as string,
        });

        return isLoginSuccess ? true : "login-fail";
      } catch (err) {
        console.log(err, "로그인 실패");
        return "/login-fail";
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.provider = user.provider;
      }

      return token;
    },

    session({ session, token }) {
      session.user.email = token.email as string;
      // session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.provider = token.provider as "GOOGLE" | "NAVER" | "KAKAO";

      return session;
    },
  },
};
