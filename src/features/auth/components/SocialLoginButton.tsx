"use client";

import type { OAuthProvider } from "@/features/auth/types/auth";
import { SOCIAL_CONFIG } from "@/features/auth/config/socialConfig";

interface Props {
  provider: OAuthProvider;
  onClick: () => void;
}

export function SocialLoginButton({ provider, onClick }: Props) {
  const { label, icon: Icon, className } = SOCIAL_CONFIG[provider];

  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-full cursor-pointer items-center justify-center gap-[10px] rounded-full px-4 leading-[var(--text-label-1-normal--line-height)] tracking-[var(--text-label-1-normal--letter-spacing)] text-[var(--text-label-1-normal)] ${className}`}
    >
      <Icon width={20} height={20} />
      {label}
    </button>
  );
}
