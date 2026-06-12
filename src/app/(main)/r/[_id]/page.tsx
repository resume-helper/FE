"use client";

import { useSession } from "next-auth/react";

export default function UserDashBoardPage() {
  const session = useSession();

  return <>{session.data?.user.name} 로그인함</>;
}
