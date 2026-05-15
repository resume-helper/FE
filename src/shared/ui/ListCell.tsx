"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type ListCellVerticalPadding = "none" | "small" | "medium" | "large";

export type ListCellContentVariant =
  | "icon"
  | "icon-button"
  | "large-icon"
  | "avatar"
  | "thumbnail"
  | "checkbox"
  | "radio"
  | "switch"
  | "button"
  | "badge"
  | "chevron"
  | "value"
  | "custom";

// ─────────────────────────────────────────────
// 수직 패딩 토큰
// ─────────────────────────────────────────────

const VERTICAL_PADDING: Record<ListCellVerticalPadding, string> = {
  none: "py-0",
  small: "py-2", // 8px
  medium: "py-3", // 12px
  large: "py-4", // 16px
};

// ─────────────────────────────────────────────
// ListCellContent variant 스타일
// ─────────────────────────────────────────────

const CONTENT_VARIANT_STYLE: Record<ListCellContentVariant, string> = {
  icon: "flex items-center justify-center w-6 h-6 text-[18px] shrink-0",
  "icon-button": "flex items-center justify-center shrink-0",
  "large-icon":
    "flex items-center justify-center w-10 h-10 text-[24px] shrink-0",
  avatar: "flex items-center justify-center shrink-0",
  thumbnail: "flex items-center justify-center shrink-0",
  checkbox: "flex items-center justify-center w-5 h-5 shrink-0",
  radio: "flex items-center justify-center w-5 h-5 shrink-0",
  switch: "flex items-center justify-center shrink-0",
  button: "flex items-center justify-center shrink-0",
  badge: "flex items-center justify-center shrink-0",
  chevron: "flex items-center gap-1 text-sm text-[#9EA7B2] shrink-0",
  value: "flex items-center text-sm text-[#9EA7B2] shrink-0",
  custom: "flex items-center shrink-0",
};

// ─────────────────────────────────────────────
// List
// ─────────────────────────────────────────────

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  gap?: string;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, gap, style, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("m-0 flex w-full list-none flex-col p-0", className)}
      style={{ gap, ...style }}
      {...props}
    >
      {children}
    </ul>
  )
);
List.displayName = "List";

// ─────────────────────────────────────────────
// ListCellContent
// ─────────────────────────────────────────────

export interface ListCellContentProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ListCellContentVariant;
  chevron?: boolean;
  disabled?: boolean;
}

export const ListCellContent = React.forwardRef<
  HTMLSpanElement,
  ListCellContentProps
>(
  (
    {
      variant = "custom",
      chevron = true,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(
        CONTENT_VARIANT_STYLE[variant],
        disabled && "pointer-events-none opacity-40",
        className
      )}
      {...props}
    >
      {children}

      {variant === "chevron" && chevron && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0 }}
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
);
ListCellContent.displayName = "ListCellContent";

// ─────────────────────────────────────────────
// ListCell
// ─────────────────────────────────────────────

export interface ListCellTextProps {
  caption?: React.ReactNode;
  captionClassName?: string;
  className?: string;
}

export interface ListCellProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  verticalPadding?: ListCellVerticalPadding;
  fillWidth?: boolean;
  interactionPadding?: string;
  ellipsis?: boolean;
  divider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  textProps?: ListCellTextProps;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  alignItems?: "flex-start" | "center" | "flex-end";
}

export const ListCell = React.forwardRef<HTMLElement, ListCellProps>(
  (
    {
      as: Tag = "li",
      className,
      verticalPadding = "medium",
      fillWidth = false,
      interactionPadding = "12px",
      ellipsis = false,
      divider = false,
      selected = false,
      disabled = false,
      disableInteraction = false,
      textProps,
      leadingContent,
      trailingContent,
      alignItems = "flex-start",
      children,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const isInteractive =
      !disableInteraction && !disabled && verticalPadding !== "none";

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      onClick?.(e);
    };

    return (
      <Tag
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-selected={selected || undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          "flex w-full list-none",
          divider && "border-b border-[#E8EBF0]",
          className
        )}
        style={style}
        onClick={handleClick}
        onKeyDown={
          isInteractive
            ? (e: React.KeyboardEvent<HTMLElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(e as unknown as React.MouseEvent<HTMLElement>);
                }
              }
            : undefined
        }
        {...props}
      >
        {/* interaction 영역 */}
        <span
          className={cn(
            "flex min-w-0 flex-1 items-start gap-3",
            VERTICAL_PADDING[verticalPadding],
            !fillWidth && "rounded-lg",
            isInteractive && [
              "relative cursor-pointer select-none",
              "transition-colors duration-100",
              "hover:bg-[rgba(0,0,0,0.04)]",
              "active:bg-[rgba(0,0,0,0.08)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500",
            ],
            selected && "bg-[rgba(75,117,255,0.08)]",
            disabled && "pointer-events-none cursor-default opacity-40"
          )}
          style={
            !fillWidth
              ? {
                  paddingLeft: interactionPadding,
                  paddingRight: interactionPadding,
                }
              : undefined
          }
        >
          {/* leading */}
          {leadingContent && (
            <span className="mt-[1px] flex shrink-0">{leadingContent}</span>
          )}

          {/* 텍스트 영역 */}
          <span
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-0.5",
              textProps?.className
            )}
          >
            <span
              className={cn(
                "text-[15px] leading-[22px] font-normal text-[#1B1C1E]",
                ellipsis && "truncate"
              )}
            >
              {children}
            </span>
            {textProps?.caption && (
              <span
                className={cn(
                  "text-[13px] leading-[18px] text-[#9EA7B2]",
                  ellipsis && "truncate",
                  textProps.captionClassName
                )}
              >
                {textProps.caption}
              </span>
            )}
          </span>

          {/* trailing */}
          {trailingContent && (
            <span className="mt-[1px] flex shrink-0">{trailingContent}</span>
          )}
        </span>
      </Tag>
    );
  }
);
ListCell.displayName = "ListCell";
