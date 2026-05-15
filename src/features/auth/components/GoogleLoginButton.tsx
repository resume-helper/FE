"use client";

import { SocialLoginButton } from "@/features/auth/components/SocialLoginButton";

interface Props {
  onClick: () => void;
}

export function GoogleLoginButton({ onClick }: Props) {
  return (
    <SocialLoginButton provider="google" onClick={onClick}>
      구글로 로그인
    </SocialLoginButton>
  );
}
