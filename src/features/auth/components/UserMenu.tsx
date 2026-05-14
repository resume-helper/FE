"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";

export function UserMenu() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => logout()}
        disabled={isPending}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        로그아웃
      </button>
    </div>
  );
}
