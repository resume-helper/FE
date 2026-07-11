"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/shared/lib/cn";

const variants = cva(
  "inline-flex items-center p-[3px_6px] font-[500] border rounded-[6px]",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        outlined: "bg-transparent",
      },
      size: {
        xsmall: "gap-[2px] text-[0.6875rem] [&>span]:size-[12px]",
        small: "gap-[3px] text-[0.75rem] [&>span]:size-[14px]",
        medium: "gap-[4px] text-[0.8125rem] [&>span]:size-[16px]",
      },
      color: {
        neutral: "text-[#37383C9C] bg-[#70737C14]",
        accent: "text-[#0098B2] bg-[#E4F0F2]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "small",
      color: "neutral",
    },
  }
);

interface BadgeProps
  extends COMPONENT_CLASS_NAME, VariantProps<typeof variants> {
  /** 텍스트 내용 */
  text: string;
  /** 백그라운드 컬러 */
  accentBackgroundColor?: string;
  /** 텍스트 색상 */
  accentContentColor?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
}

export const Badge = ({
  text,
  icon,
  color,
  size,
  variant,
  accentBackgroundColor,
  accentContentColor,
}: BadgeProps) => {
  return (
    <p
      style={{
        color: accentContentColor,
        backgroundColor: accentBackgroundColor,
      }}
      className={twMerge(
        cn(variants({ variant, size, color })),
        variant === "outlined" && "bg-transparent"
      )}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {text}
    </p>
  );
};

export type { BadgeProps };
