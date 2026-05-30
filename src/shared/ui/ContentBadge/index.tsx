"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type ContentBadgeSize = "xsmall" | "small" | "medium";
export type ContentBadgeVariant = "solid" | "outlined";
export type ContentBadgeColor = "neutral" | "accent";

type ColorKey =
  | "neutral"
  | "neutral-strong"
  | "red"
  | "red-orange"
  | "orange"
  | "lime"
  | "green"
  | "cyan"
  | "light-blue"
  | "blue"
  | "violet"
  | "purple"
  | "pink";

// ─────────────────────────────────────────────
// CVA
// ─────────────────────────────────────────────

const contentBadgeVariants = cva(
  "inline-flex items-center justify-center border whitespace-nowrap shrink-0",
  {
    variants: {
      size: {
        xsmall: "py-[3px] px-[6px] text-caption-2-medium rounded-lg",
        small: "py-1 px-[6px] text-caption-1-medium rounded-lg",
        medium: "py-[5px] px-2 text-label-2-medium rounded-[10px]",
      },
      variant: {
        solid: "border-transparent",
        outlined: "bg-transparent",
      },
      colorKey: {
        neutral: "",
        "neutral-strong": "",
        red: "",
        "red-orange": "",
        orange: "",
        lime: "",
        green: "",
        cyan: "",
        "light-blue": "",
        blue: "",
        violet: "",
        purple: "",
        pink: "",
      },
    },
    compoundVariants: [
      // neutral
      {
        variant: "solid",
        colorKey: "neutral",
        className: "bg-interaction-disable text-label-alternative",
      },
      {
        variant: "solid",
        colorKey: "neutral-strong",
        className: "bg-interaction-disable text-label-normal",
      },
      {
        variant: "outlined",
        colorKey: "neutral",
        className: "border-line-normal-strong text-label-alternative",
      },
      {
        variant: "outlined",
        colorKey: "neutral-strong",
        className: "border-line-normal-strong text-label-normal",
      },
      // accent solid
      {
        variant: "solid",
        colorKey: "red",
        className: "bg-accent-fg-red/10 text-accent-fg-red",
      },
      {
        variant: "solid",
        colorKey: "red-orange",
        className: "bg-accent-fg-red-orange/10 text-accent-fg-red-orange",
      },
      {
        variant: "solid",
        colorKey: "orange",
        className: "bg-accent-fg-orange/10 text-accent-fg-orange",
      },
      {
        variant: "solid",
        colorKey: "lime",
        className: "bg-accent-fg-lime/10 text-accent-fg-lime",
      },
      {
        variant: "solid",
        colorKey: "green",
        className: "bg-accent-fg-green/10 text-accent-fg-green",
      },
      {
        variant: "solid",
        colorKey: "cyan",
        className: "bg-accent-fg-cyan/10 text-accent-fg-cyan",
      },
      {
        variant: "solid",
        colorKey: "light-blue",
        className: "bg-accent-fg-light-blue/10 text-accent-fg-light-blue",
      },
      {
        variant: "solid",
        colorKey: "blue",
        className: "bg-accent-fg-blue/10 text-accent-fg-blue",
      },
      {
        variant: "solid",
        colorKey: "violet",
        className: "bg-accent-fg-violet/10 text-accent-fg-violet",
      },
      {
        variant: "solid",
        colorKey: "purple",
        className: "bg-accent-fg-purple/10 text-accent-fg-purple",
      },
      {
        variant: "solid",
        colorKey: "pink",
        className: "bg-accent-fg-pink/10 text-accent-fg-pink",
      },
      // accent outlined
      {
        variant: "outlined",
        colorKey: "red",
        className: "border-accent-fg-red text-accent-fg-red",
      },
      {
        variant: "outlined",
        colorKey: "red-orange",
        className: "border-accent-fg-red-orange text-accent-fg-red-orange",
      },
      {
        variant: "outlined",
        colorKey: "orange",
        className: "border-accent-fg-orange text-accent-fg-orange",
      },
      {
        variant: "outlined",
        colorKey: "lime",
        className: "border-accent-fg-lime text-accent-fg-lime",
      },
      {
        variant: "outlined",
        colorKey: "green",
        className: "border-accent-fg-green text-accent-fg-green",
      },
      {
        variant: "outlined",
        colorKey: "cyan",
        className: "border-accent-fg-cyan text-accent-fg-cyan",
      },
      {
        variant: "outlined",
        colorKey: "light-blue",
        className: "border-accent-fg-light-blue text-accent-fg-light-blue",
      },
      {
        variant: "outlined",
        colorKey: "blue",
        className: "border-accent-fg-blue text-accent-fg-blue",
      },
      {
        variant: "outlined",
        colorKey: "violet",
        className: "border-accent-fg-violet text-accent-fg-violet",
      },
      {
        variant: "outlined",
        colorKey: "purple",
        className: "border-accent-fg-purple text-accent-fg-purple",
      },
      {
        variant: "outlined",
        colorKey: "pink",
        className: "border-accent-fg-pink text-accent-fg-pink",
      },
    ],
    defaultVariants: {
      size: "xsmall",
      variant: "solid",
      colorKey: "cyan",
    },
  }
);

// ─────────────────────────────────────────────
// accentColor 파싱
// ─────────────────────────────────────────────

const CAMEL_TO_KEBAB: Record<string, string> = {
  red: "red",
  redOrange: "red-orange",
  orange: "orange",
  lime: "lime",
  green: "green",
  cyan: "cyan",
  lightBlue: "light-blue",
  blue: "blue",
  violet: "violet",
  purple: "purple",
  pink: "pink",
};

function parseAccentKey(token: string): string {
  const parts = token.split(".");
  return parts[parts.length - 1];
}

// ─────────────────────────────────────────────
// 아이콘 사이즈
// ─────────────────────────────────────────────

const ICON_SIZE: Record<ContentBadgeSize, string> = {
  xsmall: "12px",
  small: "14px",
  medium: "16px",
};

// ─────────────────────────────────────────────
// ContentBadge
// ─────────────────────────────────────────────

export interface ContentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ContentBadgeSize;
  variant?: ContentBadgeVariant;
  color?: ContentBadgeColor;
  accentColor?: string;
  neutralColor?: string;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
}

export const ContentBadge = React.forwardRef<
  HTMLSpanElement,
  ContentBadgeProps
>(
  (
    {
      size = "xsmall",
      variant = "solid",
      color = "accent",
      accentColor = "semantic.accent.foreground.cyan",
      neutralColor,
      leadingContent,
      trailingContent,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const colorKey: ColorKey =
      color === "neutral"
        ? neutralColor?.includes("strong")
          ? "neutral-strong"
          : "neutral"
        : ((CAMEL_TO_KEBAB[parseAccentKey(accentColor)] ?? "cyan") as ColorKey);

    const iconSize = ICON_SIZE[size];
    const iconStyle: React.CSSProperties = {
      width: iconSize,
      height: iconSize,
      fontSize: iconSize,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <span
        ref={ref}
        className={cn(
          contentBadgeVariants({ size, variant, colorKey }),
          className
        )}
        style={style}
        {...props}
      >
        {leadingContent && (
          <span aria-hidden style={iconStyle}>
            {leadingContent}
          </span>
        )}

        {children}

        {trailingContent && (
          <span aria-hidden style={iconStyle}>
            {trailingContent}
          </span>
        )}
      </span>
    );
  }
);
ContentBadge.displayName = "ContentBadge";
