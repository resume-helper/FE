"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type TooltipMode = "hover" | "click" | "always";
export type TooltipSize = "small" | "medium";
export type TooltipPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "right-start"
  | "right-center"
  | "right-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"
  | "left-start"
  | "left-center"
  | "left-end";

// ─────────────────────────────────────────────
// position
// ─────────────────────────────────────────────

function parsePosition(position: TooltipPosition): {
  side: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
} {
  const [side, align = "center"] = position.split("-") as [
    "top" | "right" | "bottom" | "left",
    "start" | "center" | "end",
  ];
  return { side, align };
}

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_CONFIG: Record<
  TooltipSize,
  {
    minWidth: string;
    fontSize: string;
    px: string;
    py: string;
    shortcutSize: string;
  }
> = {
  small: {
    minWidth: "36px",
    fontSize: "12px",
    px: "8px",
    py: "4px",
    shortcutSize: "11px",
  },
  medium: {
    minWidth: "64px",
    fontSize: "13px",
    px: "12px",
    py: "8px",
    shortcutSize: "12px",
  },
};

// ─────────────────────────────────────────────
// TooltipGroup
// ─────────────────────────────────────────────

export interface TooltipGroupProps {
  skipDelayDuration?: number;
  children?: React.ReactNode;
}

export function TooltipGroup({
  skipDelayDuration = 350,
  children,
}: TooltipGroupProps) {
  return (
    <TooltipPrimitive.Provider
      skipDelayDuration={skipDelayDuration}
      delayDuration={0}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}
TooltipGroup.displayName = "TooltipGroup";

// ─────────────────────────────────────────────
// Tooltip
// ─────────────────────────────────────────────

export interface TooltipProps {
  mode?: TooltipMode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  enterDelay?: number;
  leaveDelay?: number;
  disableCloseOnPointDown?: boolean;
  disableOpenOnFocus?: boolean;
  children?: React.ReactNode;
}

export function Tooltip({
  mode = "hover",
  open: openProp,
  defaultOpen,
  onOpenChange,
  enterDelay = 200,
  children,
}: TooltipProps) {
  const isAlways = mode === "always";
  const [clickOpen, setClickOpen] = React.useState(false);

  const resolvedOpen =
    openProp !== undefined
      ? openProp
      : isAlways
        ? true
        : mode === "click"
          ? clickOpen
          : undefined;

  const handleOpenChange = (next: boolean) => {
    if (mode === "click") setClickOpen(next);
    onOpenChange?.(next);
  };

  const processedChildren =
    mode === "click"
      ? React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            (child.type as { displayName?: string }).displayName ===
              "TooltipTrigger"
          ) {
            return React.cloneElement(
              child as React.ReactElement<{ _onClick?: () => void }>,
              {
                _onClick: () => setClickOpen((v) => !v),
              }
            );
          }
          return child;
        })
      : children;

  return (
    <TooltipPrimitive.Provider
      delayDuration={mode === "hover" ? enterDelay : 0}
      skipDelayDuration={350}
    >
      <TooltipPrimitive.Root
        open={resolvedOpen}
        defaultOpen={defaultOpen ?? isAlways}
        onOpenChange={handleOpenChange}
        disableHoverableContent={mode !== "hover"}
      >
        {processedChildren}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
Tooltip.displayName = "Tooltip";

// ─────────────────────────────────────────────
// TooltipTrigger
// ─────────────────────────────────────────────

export interface TooltipTriggerProps {
  children?: React.ReactNode;
  _onClick?: () => void;
}

export function TooltipTrigger({ children, _onClick }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger asChild onClick={_onClick}>
      {children}
    </TooltipPrimitive.Trigger>
  );
}
TooltipTrigger.displayName = "TooltipTrigger";

// ─────────────────────────────────────────────
// TooltipContent
// ─────────────────────────────────────────────

export interface TooltipContentProps {
  size?: TooltipSize;
  position?: TooltipPosition;
  shortcut?: React.ReactNode;
  action?: React.ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  offset?: number;
  forceMount?: boolean;
  disablePortal?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TooltipContent({
  size = "medium",
  position = "top-center",
  shortcut,
  action,
  closeButton = false,
  onClose,
  offset = 4,
  forceMount,
  disablePortal,
  children,
  className,
  style,
}: TooltipContentProps) {
  const { side, align } = parsePosition(position);
  const cfg = SIZE_CONFIG[size];

  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const contentEl = (
    <TooltipPrimitive.Content
      side={side}
      align={align}
      sideOffset={offset}
      forceMount={forceMount || undefined}
      className={cn(
        "z-50 max-w-[280px] break-words",
        "rounded-lg bg-[#1B1C1E] text-white",
        "shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
        "animate-in fade-in-0 zoom-in-95 duration-100",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=top]:slide-in-from-bottom-1",
        "data-[side=bottom]:slide-in-from-top-1",
        "data-[side=left]:slide-in-from-right-1",
        "data-[side=right]:slide-in-from-left-1",
        className
      )}
      style={{ minWidth: cfg.minWidth, fontSize: cfg.fontSize, ...style }}
    >
      <div
        className="flex items-start gap-2"
        style={{ padding: `${cfg.py} ${cfg.px}` }}
      >
        <span className="flex-1 leading-[1.5] text-white/90">{children}</span>

        {/* shortcut */}
        {shortcut && (
          <span
            className="shrink-0 rounded bg-white/15 px-1 py-0.5 font-mono leading-none text-white/70"
            style={{ fontSize: cfg.shortcutSize }}
          >
            {shortcut}
          </span>
        )}

        {closeButton && (
          <button
            type="button"
            aria-label="닫기"
            onClick={() => onCloseRef.current?.()}
            className="shrink-0 rounded p-0.5 text-white/50 transition-colors outline-none hover:text-white focus-visible:ring-1 focus-visible:ring-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* action 영역 */}
      {action && (
        <div className="border-t border-white/10 px-3 py-2">{action}</div>
      )}

      {/* arrow */}
      <TooltipPrimitive.Arrow
        className="fill-[#1B1C1E]"
        width={10}
        height={5}
      />
    </TooltipPrimitive.Content>
  );

  if (disablePortal) return contentEl;

  return <TooltipPrimitive.Portal>{contentEl}</TooltipPrimitive.Portal>;
}
TooltipContent.displayName = "TooltipContent";
