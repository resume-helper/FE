"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "@/shared/ui/Button";

export function UserMenu() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex items-center gap-3">
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
