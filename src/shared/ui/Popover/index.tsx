"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Close } from "@/shared/icons";
import { IconButton } from "@/shared/ui/IconButton";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type PopoverVariant = "normal" | "custom";
export type PopoverPosition =
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
// Context
// ─────────────────────────────────────────────

interface PopoverInternalContextValue {
  close: () => void;
}

const PopoverInternalContext = React.createContext<PopoverInternalContextValue>(
  { close: () => {} }
);

// ─────────────────────────────────────────────
// position 파싱
// ─────────────────────────────────────────────

function parsePosition(position: PopoverPosition): {
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
// Popover (Root)
// ─────────────────────────────────────────────

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const close = () => handleOpenChange(false);

  return (
    <PopoverInternalContext.Provider value={{ close }}>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    </PopoverInternalContext.Provider>
  );
}
Popover.displayName = "Popover";

// ─────────────────────────────────────────────
// PopoverTrigger
// ─────────────────────────────────────────────

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function PopoverTrigger({
  children,
  asChild = true,
}: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger asChild={asChild}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}
PopoverTrigger.displayName = "PopoverTrigger";

// ─────────────────────────────────────────────
// PopoverContent variants
// ─────────────────────────────────────────────

const popoverContentVariants = cva(
  [
    "bg-background-elevated-normal shadow-elevation-normal-medium z-50",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
  ],
  {
    variants: {
      variant: {
        normal: "max-w-90 rounded-xl px-3.5 py-3",
        custom: "rounded-2xl p-4",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  }
);

// ─────────────────────────────────────────────
// PopoverContent — normal variant
// ─────────────────────────────────────────────

interface NormalPopoverContentProps {
  variant?: "normal";
  heading?: React.ReactNode;
  closeButton?: boolean;
  action?: React.ReactNode;
  position?: PopoverPosition;
  offset?: number;
  forceMount?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CustomPopoverContentProps {
  variant: "custom";
  heading?: never;
  closeButton?: never;
  action?: never;
  position?: PopoverPosition;
  offset?: number;
  forceMount?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export type PopoverContentProps =
  | NormalPopoverContentProps
  | CustomPopoverContentProps;

export function PopoverContent({
  variant = "normal",
  position = "bottom-center",
  offset = 10,
  forceMount,
  children,
  className,
  style,
  ...props
}: PopoverContentProps) {
  const { side, align } = parsePosition(position);
  const { close } = React.useContext(PopoverInternalContext);

  const isNormal = variant === "normal";
  const { heading, closeButton, action } = isNormal
    ? (props as NormalPopoverContentProps)
    : { heading: undefined, closeButton: undefined, action: undefined };

  return (
    <PopoverPrimitive.Portal forceMount={forceMount || undefined}>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={offset}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "bg-background-elevated-normal shadow-elevation-normal-medium z-50",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          popoverContentVariants({ variant }),
          className
        )}
        style={style}
      >
        {isNormal ? (
          <>
            {/* 헤더 */}
            {(heading || closeButton) && (
              <div className="mb-1 flex items-start justify-between gap-2">
                {heading && (
                  <span className="text-body-2-normal-bold text-label-normal flex-1">
                    {heading}
                  </span>
                )}
                {closeButton && <CloseButton onClose={close} />}
              </div>
            )}

            {/* 본문 */}
            <div className="text-label-2-medium text-label-alternative wrap-break-word">
              {children}
            </div>

            {/* 액션 */}
            {action && <div className="mt-3">{action}</div>}
          </>
        ) : (
          children
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
PopoverContent.displayName = "PopoverContent";

// ─────────────────────────────────────────────
// CloseButton (internal)
// ─────────────────────────────────────────────

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <IconButton
      label="닫기"
      variant="normal"
      onClick={onClose}
      className="text-label-alternative mt-0.5 shrink-0"
    >
      <Close width={16} height={16} />
    </IconButton>
  );
}
