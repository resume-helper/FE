"use client";

import { SocialLoginButton } from "@/features/auth/components/SocialLoginButton";

interface Props {
  onClick: () => void;
}

export function NaverLoginButton({ onClick }: Props) {
  return (
    <SocialLoginButton provider="naver" onClick={onClick}>
      네이버 로그인
    </SocialLoginButton>
  );
}
