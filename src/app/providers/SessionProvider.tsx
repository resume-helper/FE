"use client";

import type { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

import { LayoutChild } from "@/shared/types/components";

interface SessionProbider extends LayoutChild {
  session?: Session | null;
}

export const SessionProvider = ({ children, session }: SessionProbider) => {
  return (
    <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </NextAuthSessionProvider>
  );
};
