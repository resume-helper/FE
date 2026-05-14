"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";

export function UserMenu() {
  const { mutate: logout } = useLogout();

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => logout()} className="cursor-pointer">
        로그아웃
      </button>
    </div>
  );
}
