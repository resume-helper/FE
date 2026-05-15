"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";

export function UserMenu() {
  const { mutate: logout, isPending } = useLogout();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex items-center gap-3">
      <Avatar
        variant="person"
        src={user?.profileImageUrl}
        alt={user?.profileImageUrl ? user?.name : undefined}
      />

      <Button
        variant="outlined"
        color="assistive"
        size="small"
        loading={isPending}
        onClick={() => logout()}
      >
        로그아웃
      </Button>
    </div>
  );
}
