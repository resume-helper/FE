"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type ContentBadgeSize = "xsmall" | "small" | "medium";
export type ContentBadgeVariant = "solid" | "outlined";
export type ContentBadgeColor = "neutral" | "accent";

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_CONFIG: Record<
  ContentBadgeSize,
  {
    height: string;
    px: string;
    fontSize: string;
    iconSize: string;
    gap: string;
  }
> = {
  xsmall: {
    height: "18px",
    px: "4px",
    fontSize: "11px",
    iconSize: "12px",
    gap: "2px",
  },
  small: {
    height: "20px",
    px: "6px",
    fontSize: "12px",
    iconSize: "14px",
    gap: "2px",
  },
  medium: {
    height: "24px",
    px: "8px",
    fontSize: "13px",
    iconSize: "16px",
    gap: "4px",
  },
};

// ─────────────────────────────────────────────
// Accent 컬러 토큰
// ─────────────────────────────────────────────

const ACCENT_COLORS: Record<string, { fg: string; bg: string }> = {
  red: { fg: "#E03131", bg: "#FFF0F0" },
  redOrange: { fg: "#D9480F", bg: "#FFF4EE" },
  orange: { fg: "#E67700", bg: "#FFF9DB" },
  lime: { fg: "#5C940D", bg: "#F4FCE3" },
  green: { fg: "#2F9E44", bg: "#EBFBEE" },
  cyan: { fg: "#0C8599", bg: "#E3FAFC" },
  lightBlue: { fg: "#1971C2", bg: "#E7F5FF" },
  blue: { fg: "#3B5BDB", bg: "#EDF2FF" },
  violet: { fg: "#6741D9", bg: "#F3F0FF" },
  purple: { fg: "#9C36B5", bg: "#F8F0FC" },
  pink: { fg: "#C2255C", bg: "#FFF0F6" },
};

// neutral 컬러
const NEUTRAL = {
  solidBg: "#F1F3F5",
  outlinedBorder: "#CED4DA",
  defaultFg: "#868E96",
  strongFg: "#343A40",
};

// ─────────────────────────────────────────────
// accentColor 파싱
// ─────────────────────────────────────────────

function parseAccentKey(token: string): string {
  const parts = token.split(".");
  return parts[parts.length - 1];
}

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
    const cfg = SIZE_CONFIG[size];

    // ── 색상 계산 ──────────────────────────────
    let fg = "";
    let bg = "";
    let border = "";

    if (color === "neutral") {
      const customFg = neutralColor
        ? neutralColor.startsWith("#") || neutralColor.startsWith("rgb")
          ? neutralColor
          : neutralColor.includes("strong")
            ? NEUTRAL.strongFg
            : NEUTRAL.defaultFg
        : NEUTRAL.defaultFg;

      fg = customFg;

      if (variant === "solid") {
        bg = NEUTRAL.solidBg;
        border = "transparent";
      } else {
        bg = "transparent";
        border = NEUTRAL.outlinedBorder;
      }
    } else {
      const key =
        accentColor.startsWith("#") || accentColor.startsWith("rgb")
          ? null
          : parseAccentKey(accentColor);

      const resolved = key
        ? (ACCENT_COLORS[key] ?? ACCENT_COLORS.cyan)
        : { fg: accentColor, bg: accentColor + "1a" };

      fg = resolved.fg;

      if (variant === "solid") {
        bg = resolved.bg;
        border = "transparent";
      } else {
        bg = "transparent";
        border = resolved.fg;
      }
    }

    const computedStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: cfg.gap,
      height: cfg.height,
      paddingLeft: cfg.px,
      paddingRight: cfg.px,
      borderRadius: "4px",
      border: `1px solid ${border}`,
      backgroundColor: bg,
      color: fg,
      fontSize: cfg.fontSize,
      fontWeight: 500,
      lineHeight: 1,
      whiteSpace: "nowrap",
      flexShrink: 0,
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      width: cfg.iconSize,
      height: cfg.iconSize,
      fontSize: cfg.iconSize,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <span
        ref={ref}
        className={cn(className)}
        style={computedStyle}
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
