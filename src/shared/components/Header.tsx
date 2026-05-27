"use client";

import Link from "next/link";
import { getColorByToken, useTheme } from "@wanteddev/wds";
import { useMe } from "@/features/auth/hooks/useMe";
import { useAuthStore } from "@/features/auth/store/authStore";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { GuestMenu } from "@/features/auth/components/GuestMenu";

export default function Header() {
  useMe();
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);

  return (
    <header
      className="sticky top-0 z-[100] flex h-14 items-center border-b"
      style={{
        background: getColorByToken(theme, "semantic.background.normal.normal"),
        borderColor: getColorByToken(theme, "semantic.line.solid.alternative"),
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5">
        <Link href="/">LOGO</Link>
        {user ? <UserMenu /> : <GuestMenu />}
      </div>
    </header>
  );
}
