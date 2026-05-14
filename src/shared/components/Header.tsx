"use client";

import Link from "next/link";
import { useMe } from "@/features/auth/hooks/useMe";
import { useAuthStore } from "@/features/auth/store/authStore";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { GuestMenu } from "@/features/auth/components/GuestMenu";

export default function Header() {
  useMe();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="bg-background-normal border-line-solid-alternative sticky top-0 z-[100] flex h-14 items-center border-b">
      <div className="mx-auto flex w-full max-w-1200 items-center justify-between px-5">
        {/* 로고 */}
        <Link href="/">LOGO</Link>

        {/* GNB */}
        {user ? <UserMenu /> : <GuestMenu />}
      </div>
    </header>
  );
}
