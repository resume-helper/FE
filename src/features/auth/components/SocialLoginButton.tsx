"use client";

import { Button } from "@wanteddev/wds";
import type { OAuthProvider } from "@/features/auth/types/auth";
import { SOCIAL_CONFIG } from "@/features/auth/config/socialConfig";

interface SocialLoginButtonProps {
  provider: OAuthProvider;
  onClick: () => void;
  children: React.ReactNode;
}

export function SocialLoginButton({
  provider,
  onClick,
  children,
}: SocialLoginButtonProps) {
  const { icon: Icon, style } = SOCIAL_CONFIG[provider];

  return (
    <Button
      onClick={onClick}
      fullWidth
      leadingContent={<Icon width={20} height={20} />}
      style={style}
      sx={{
        height: 40,
        borderRadius: "9999px",
        gap: "10px",
        padding: "0 16px",
      }}
    >
      {children}
    </Button>
  );
}
