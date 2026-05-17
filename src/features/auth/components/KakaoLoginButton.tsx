"use client";

import { SocialLoginButton } from "@/features/auth/components/SocialLoginButton";

interface Props {
  onClick: () => void;
}

export function KakaoLoginButton({ onClick }: Props) {
  return (
    <SocialLoginButton provider="kakao" onClick={onClick}>
      카카오 로그인
    </SocialLoginButton>
  );
}
