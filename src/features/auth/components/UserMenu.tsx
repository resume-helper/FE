"use client";

import styled from "styled-components";
import { Avatar, Button } from "@wanteddev/wds";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/authStore";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export function UserMenu() {
  const { mutate: logout, isPending } = useLogout();
  const user = useAuthStore((s) => s.user);

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
