"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/shared/lib/cn";
import { AvatarPerson, AvatarCompany, AvatarAcademy } from "@/shared/icons";

export type AvatarVariant = "person" | "company" | "academy";
export type AvatarSize =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | number;

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_CONFIG = {
  xsmall: {
    px: 24,
    fontSize: "10px",
    radius: { company: "6px", academy: "6px" },
  },
  small: {
    px: 32,
    fontSize: "12px",
    radius: { company: "8px", academy: "8px" },
  },
  medium: {
    px: 40,
    fontSize: "14px",
    radius: { company: "10px", academy: "10px" },
  },
  large: {
    px: 48,
    fontSize: "16px",
    radius: { company: "12px", academy: "12px" },
  },
  xlarge: {
    px: 64,
    fontSize: "18px",
    radius: { company: "16px", academy: "16px" },
  },
} as const;

type SizeKey = keyof typeof SIZE_CONFIG;

const NAMED_SIZE_PX: Record<SizeKey, number> = {
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 64,
};

// ─────────────────────────────────────────────
// 색상 토큰
// ─────────────────────────────────────────────

const VARIANT_COLORS: Record<AvatarVariant, { bg: string; fg: string }> = {
  person: { bg: "#E8E9EA", fg: "#FFFFFF" },
  company: { bg: "#E8E9EA", fg: "#FFFFFF" },
  academy: { bg: "#E8E9EA", fg: "#FFFFFF" },
};

const FALLBACK_ICON: Record<AvatarVariant, React.ElementType> = {
  person: AvatarPerson,
  company: AvatarCompany,
  academy: AvatarAcademy,
};

// ─────────────────────────────────────────────
// border-radius 계산
// ─────────────────────────────────────────────

function getBorderRadius(variant: AvatarVariant, size: AvatarSize): string {
  if (variant === "person") return "9999px";
  if (typeof size === "number") {
    const raw = size * 0.25;
    const rounded = Math.ceil(raw % 2 !== 0 ? raw + 1 : raw);
    return `${rounded}px`;
  }
  return SIZE_CONFIG[size as SizeKey].radius[variant as "company" | "academy"];
}

// ─────────────────────────────────────────────
// Avatar
// ─────────────────────────────────────────────

export interface AvatarProps extends Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  "children"
> {
  variant?: AvatarVariant;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  srcSet?: string;
  loading?: React.ImgHTMLAttributes<HTMLImageElement>["loading"];
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
  borderColor?: string;
  borderWeight?: number;
  children?: React.ReactNode;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  onAbort?: React.ReactEventHandler<HTMLImageElement>;
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      style,
      variant = "person",
      size = "small",
      src,
      alt,
      srcSet,
      loading,
      crossOrigin,
      referrerPolicy,
      borderColor,
      borderWeight = 1,
      children,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const isCustomSize = typeof size === "number";
    const sizePx = isCustomSize
      ? (size as number)
      : SIZE_CONFIG[size as SizeKey].px;
    const fontSize = isCustomSize
      ? `${Math.round((size as number) * 0.35)}px`
      : SIZE_CONFIG[size as SizeKey].fontSize;
    const borderRadius = getBorderRadius(variant, size);
    const colors = VARIANT_COLORS[variant];
    const Icon = FALLBACK_ICON[variant];

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(className)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          userSelect: "none",
          width: sizePx,
          height: sizePx,
          minWidth: sizePx,
          minHeight: sizePx,
          overflow: "visible",
          borderRadius,
          backgroundColor: colors.bg,
          color: colors.fg,
          fontSize,
          outline: `${borderWeight}px solid ${borderColor ?? "#DFE0E2"}`,
          outlineOffset: "0px",
          ...style,
        }}
        {...props}
      >
        {/* 이미지/아이콘 클리핑 래퍼 */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {src && (
            <AvatarPrimitive.Image
              src={src}
              alt={alt}
              srcSet={srcSet}
              loading={loading}
              crossOrigin={crossOrigin}
              referrerPolicy={referrerPolicy}
              onLoad={onLoad}
              onError={onError}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <AvatarPrimitive.Fallback
            data-role="avatar-fallback"
            delayMs={src ? 300 : 0}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {children ?? (
              <Icon style={{ width: "140%", height: "140%", flexShrink: 0 }} />
            )}
          </AvatarPrimitive.Fallback>
        </span>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

// ─────────────────────────────────────────────
// PushBadge
// ─────────────────────────────────────────────

const BADGE_DOT_SIZE = { xsmall: 6, small: 8, medium: 10 } as const;

function getBadgeDotSize(avatarSize: AvatarSize): number {
  const px =
    typeof avatarSize === "number"
      ? avatarSize
      : NAMED_SIZE_PX[avatarSize as SizeKey];
  if (px <= 36) return BADGE_DOT_SIZE.xsmall;
  if (px <= 52) return BADGE_DOT_SIZE.small;
  return BADGE_DOT_SIZE.medium;
}

export interface PushBadgeProps {
  children: React.ReactNode;
  avatarSize?: AvatarSize;
  className?: string;
}

export function PushBadge({
  children,
  avatarSize = "small",
  className,
}: PushBadgeProps) {
  const dotSize = getBadgeDotSize(avatarSize);
  const offset = -Math.floor(dotSize / 4);

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      {children}
      <span
        aria-label="새 알림"
        style={{
          position: "absolute",
          top: offset,
          right: offset,
          width: dotSize,
          height: dotSize,
          borderRadius: "9999px",
          backgroundColor: "#3B82F6",
          boxShadow: "0 0 0 2px white",
          zIndex: 3,
        }}
      />
    </span>
  );
}
PushBadge.displayName = "PushBadge";

// ─────────────────────────────────────────────
// AvatarButton
// ─────────────────────────────────────────────

export interface AvatarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AvatarVariant;
  size?: AvatarSize;
  disableInteraction?: boolean;
  children: React.ReactNode;
}

export const AvatarButton = React.forwardRef<
  HTMLButtonElement,
  AvatarButtonProps
>(
  (
    {
      className,
      variant = "person",
      size = "small",
      disableInteraction = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const overlayRadius = (() => {
      if (variant === "person") return "9999px";
      if (typeof size === "number") {
        const raw = size * 0.25;
        const rounded = Math.ceil(raw % 2 !== 0 ? raw + 1 : raw);
        return `${rounded + 8}px`;
      }
      const base = parseInt(
        SIZE_CONFIG[size as SizeKey].radius[variant as "company" | "academy"],
        10
      );
      return `${base + 8}px`;
    })();

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "group relative inline-flex shrink-0 cursor-pointer",
          "border-0 bg-transparent p-0 outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none",
          disableInteraction && "pointer-events-none",
          className
        )}
        {...props}
      >
        {children}

        {!disableInteraction && (
          <span
            aria-hidden
            className="pointer-events-none absolute bg-[#1B1C1E] opacity-0 transition-opacity duration-150 group-hover:opacity-[0.05] group-active:opacity-[0.12]"
            style={{
              top: "-8px",
              left: "-8px",
              right: "-8px",
              bottom: "-8px",
              borderRadius: overlayRadius,
            }}
          />
        )}
      </button>
    );
  }
);
AvatarButton.displayName = "AvatarButton";
