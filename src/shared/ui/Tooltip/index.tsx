"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/shared/lib/cn";
import { Close } from "@/shared/icons";

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const TooltipInternalContext = React.createContext<{ close: () => void }>({
  close: () => {},
});

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
    px: string;
    py: string;
    typography: string;
  }
> = {
  small: {
    px: "8px",
    py: "5px",
    typography: "text-caption-2-medium",
  },
  medium: {
    px: "10px",
    py: "8px",
    typography: "text-label-1-normal-medium",
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
  const [dismissed, setDismissed] = React.useState(false);

  const resolvedOpen =
    openProp !== undefined
      ? openProp
      : isAlways
        ? !dismissed
        : mode === "click"
          ? clickOpen
          : undefined;

  const handleOpenChange = (next: boolean) => {
    if (mode !== "click") onOpenChange?.(next);
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

  const close = React.useCallback(() => {
    if (mode === "always") setDismissed(true);
    if (mode === "click") setClickOpen(false);
    onOpenChange?.(false);
  }, [mode, onOpenChange]);

  return (
    <TooltipInternalContext.Provider value={{ close }}>
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
    </TooltipInternalContext.Provider>
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

  const { close: closeTooltip } = React.useContext(TooltipInternalContext);

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
        "text-inverse-label rounded-lg bg-[rgba(var(--semantic-inverse-background-rgb),0.88)]",
        "data-[state=open]:animate-tooltip-in",
        "data-[state=closed]:animate-tooltip-out",
        className
      )}
      style={{ ...style }}
    >
      <div
        className="relative z-[1] flex items-start gap-2"
        style={{ padding: `${cfg.py} ${cfg.px}` }}
      >
        <div className="flex flex-1 flex-col gap-[6px]">
          <div className="flex gap-1">
            <span className={cfg.typography}>{children}</span>

            {/* shortcut */}
            {shortcut && (
              <span
                className={cn(
                  cfg.typography,
                  "w-fit shrink-0 text-[rgba(var(--semantic-inverse-label-rgb),0.61)]"
                )}
              >
                {shortcut}
              </span>
            )}
          </div>
        </div>

        {closeButton && (
          <button
            type="button"
            aria-label="닫기"
            onClick={() => {
              closeTooltip();
              onCloseRef.current?.();
            }}
            className={cn(
              "group relative mt-0.5 flex shrink-0 cursor-pointer items-center justify-center",
              "border-none bg-transparent p-0 text-[rgba(var(--semantic-inverse-label-rgb),0.61)]",
              "focus-visible:outline-primary-normal focus-visible:outline-2 focus-visible:outline-offset-[1px]"
            )}
          >
            <div
              role="presentation"
              className={cn(
                "absolute top-1/2 left-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2",
                "rounded-full bg-[var(--semantic-inverse-label)]",
                "scale-0 opacity-0",
                "transition-[transform,opacity] duration-[120ms] ease-in",
                "group-hover:scale-100 group-hover:opacity-[0.0375]"
              )}
              style={{
                width: "calc(100% + 16px)",
                height: "calc(100% + 16px)",
              }}
            />
            <Close width={16} height={16} />
          </button>
        )}
      </div>

      {/* action 영역 */}
      {action && (
        <div className="border-static-white/10 border-t px-3 py-2">
          {action}
        </div>
      )}

      {/* arrow */}
      <TooltipPrimitive.Arrow asChild width={14} height={6}>
        <svg
          viewBox="0 0 14 6"
          width={14}
          height={6}
          fill="none"
          className={cn(side === "top" && "-mt-px")}
        >
          <path
            d="M0 0 L3 3.2 Q5 7 7 3.2 L10 0 Z"
            fill="rgba(var(--semantic-inverse-background-rgb),0.88)"
          />
        </svg>
      </TooltipPrimitive.Arrow>
    </TooltipPrimitive.Content>
  );

  if (disablePortal) return contentEl;

  return <TooltipPrimitive.Portal>{contentEl}</TooltipPrimitive.Portal>;
}
TooltipContent.displayName = "TooltipContent";
