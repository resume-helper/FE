"use client";

import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
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
  const { icon: Icon, className } = SOCIAL_CONFIG[provider];

  return (
    <Button
      onClick={onClick}
      fullWidth
      leadingIcon={<Icon width={20} height={20} />}
      className={cn(
        "text-label-1-normal h-10 gap-[10px] rounded-full px-4 font-medium",
        className
      )}
    >
      {children}
    </Button>
  );
}
