"use client";

import { Toaster } from "sonner";
import { cn } from "@/shared/lib/cn";
import CircleCheckFill from "@/shared/icons/CircleCheckFill";
import TriangleExclamationFill from "@/shared/icons/TriangleExclamationFill";
import CircleCloseFill from "@/shared/icons/CircleCloseFill";

const iconStyle = { width: 20, height: 20, flexShrink: 0 } as const;

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <div className="bg-static-white absolute inset-[25%] rounded-full" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Toast() {
  return (
    <Toaster
      position="bottom-center"
      expand={true}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            "relative flex items-center gap-2 overflow-hidden",
            "w-[calc(100vw-40px)] max-w-[420px]",
            "rounded-xl px-4 py-[11px]",
            "bg-inverse-background/52 backdrop-blur-[32px]",
            "before:absolute before:inset-0 before:bg-primary-normal/5",
            "text-body-2-normal font-semibold",
            "text-static-white/[0.88]"
          ),
          icon: "relative shrink-0 z-10",
          title: "relative z-10",
        },
      }}
      icons={{
        success: (
          <IconWrapper>
            <CircleCheckFill
              className="text-status-positive"
              style={iconStyle}
            />
          </IconWrapper>
        ),
        warning: (
          <IconWrapper>
            <TriangleExclamationFill
              className="text-status-cautionary"
              style={iconStyle}
            />
          </IconWrapper>
        ),
        error: (
          <IconWrapper>
            <CircleCloseFill
              className="text-status-negative"
              style={iconStyle}
            />
          </IconWrapper>
        ),
      }}
    />
  );
}
