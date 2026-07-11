import type { NextAuthOptions } from "next-auth";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { API_SERVER_SOCIAL_LOGIN } from "./entities/auth/social-login/api/api.server.social.login";
import { API_SERVER_ME } from "./entities/auth/me/api/api.server.me";

const maxAge = 60 * 60 * 4;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    // maxAge,
  },
  jwt: {
    // maxAge,
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
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const isLoginSuccess = await API_SERVER_SOCIAL_LOGIN({
          provider: user.provider,
          providerUserId: user.id as string,
          email: user.email as string,
          name: user.name as string,
        });

        if (!isLoginSuccess) {
          return "/login-fail";
        }

        const userInfo = await API_SERVER_ME();

        if (userInfo) {
          user.id = String(userInfo.id);
          user.name = userInfo.name;
          user.email = userInfo.email;
          user.profileImageUrl = userInfo.profileImageUrl;
        }

        return true;
      } catch (err) {
        console.log(err, "EE");
        return "/login-fail";
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.profileImageUrl = user.profileImageUrl;
      }

      return token;
    },

    session({ session, token }) {
      session.user.email = token.email;
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.profileImageUrl = token.profileImageUrl;

      return session;
    },
  },
};
