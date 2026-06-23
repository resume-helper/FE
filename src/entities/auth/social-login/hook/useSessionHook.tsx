"use client";

import { useSession } from "next-auth/react";

export const useSessionHook = () => {
  const session = useSession();

  const user = session.data?.user;

  const isLogin = !!user;

  const isLoginLoading = session.status === "loading" && !user;

  return {
    isLogin,
    isLoginLoading,
    user,
    sessionStatus: session.status,
    SessionUpdateCallback: session.update,
  };
};
