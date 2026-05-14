"use client";

import { useAuthStore } from "@/features/auth/store/authStore";

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="mx-auto max-w-1200 px-5 py-10">
      {user ? <h1>{user.name}님, 환영합니다!</h1> : <p>로그인이 필요합니다.</p>}
    </div>
  );
}
