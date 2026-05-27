"use client";

import Link from "next/link";
import styled from "styled-components";
import { getColorByToken, useTheme } from "@wanteddev/wds";
import { useMe } from "@/features/auth/hooks/useMe";
import { useAuthStore } from "@/features/auth/store/authStore";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { GuestMenu } from "@/features/auth/components/GuestMenu";

const StyledHeader = styled.header<{ $bg: string; $borderColor: string }>`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
  background: ${({ $bg }) => $bg};
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export default function Header() {
  useMe();
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);

  return (
    <StyledHeader
      $bg={getColorByToken(theme, "semantic.background.normal.normal")}
      $borderColor={getColorByToken(theme, "semantic.line.solid.alternative")}
    >
      <Inner>
        <Link href="/">LOGO</Link>
        {user ? <UserMenu /> : <GuestMenu />}
      </Inner>
    </StyledHeader>
  );
}
