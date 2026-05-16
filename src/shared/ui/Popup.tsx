"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cva } from "class-variance-authority";
import { Close } from "@/shared/icons";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type PopupSize = "medium" | "large" | "xlarge";
type PopupResize = "hug" | "fixed";
type NavigationVariant = "normal" | "emphasized" | "floating" | "display";
type ActionAreaVariant = "strong" | "neutral" | "compact" | "cancel";

// ─────────────────────────────────────────────
// CVA Variants
// ─────────────────────────────────────────────

const popupContainerVariants = cva(
  [
    "fixed inset-0 m-auto h-fit",
    "z-[1001] flex flex-col overflow-hidden rounded-xl",
    "bg-background-normal shadow-[0_8px_40px_rgba(0,0,0,0.16)] outline-none",
    "max-w-[calc(100vw-32px)]",
    "data-[state=open]:animate-popup-content-in",
    "data-[state=closed]:animate-popup-content-out",
  ],
  {
    variants: {
      size: {
        medium: "w-[400px] [--popup-padding:20px]",
        large: "w-[480px] [--popup-padding:24px]",
        xlarge: "w-[560px] [--popup-padding:32px]",
      },
      resize: {
        hug: "max-h-[760px]",
        fixed: "",
      },
    },
    compoundVariants: [
      { resize: "fixed", size: "medium", className: "max-h-[480px]" },
      { resize: "fixed", size: "large", className: "max-h-[560px]" },
      { resize: "fixed", size: "xlarge", className: "max-h-[640px]" },
    ],
    defaultVariants: {
      size: "medium",
      resize: "hug",
    },
  }
);

const popupNavTitleVariants = cva("flex-1 py-1 text-label-strong", {
  variants: {
    variant: {
      normal: "text-center text-body-2-normal-bold",
      emphasized: "text-left text-body-2-normal-bold",
      floating: "sr-only",
      display: "text-center text-headline-1-bold",
    },
  },
  defaultVariants: { variant: "normal" },
});

const popupActionAreaVariants = cva(
  "shrink-0 flex gap-2 p-[var(--popup-padding,20px)] border-t border-line-solid-normal",
  {
    variants: {
      variant: {
        strong: "flex-col",
        neutral: "flex-row",
        compact: "flex-row justify-end",
        cancel: "flex-row justify-center",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

// ─────────────────────────────────────────────
// Popup
// ─────────────────────────────────────────────

interface PopupProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  open,
  defaultOpen,
  onOpenChange,
  children,
}) => (
  <DialogPrimitive.Root
    open={open}
    defaultOpen={defaultOpen}
    onOpenChange={onOpenChange}
  >
    {children}
  </DialogPrimitive.Root>
);

// ─────────────────────────────────────────────
// PopupTrigger
// ─────────────────────────────────────────────

const PopupTrigger = DialogPrimitive.Trigger;

// ─────────────────────────────────────────────
// PopupContainer
// ─────────────────────────────────────────────

interface PopupContainerProps {
  size?: PopupSize;
  resize?: PopupResize;
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  "aria-label"?: string;
  className?: string;
  children: React.ReactNode;
}

const PopupContainer = React.forwardRef<HTMLDivElement, PopupContainerProps>(
  (
    {
      size = "medium",
      resize = "hug",
      disableOutsideClickClose = false,
      disableEscapeKeyDownClose = false,
      "aria-label": ariaLabel,
      className,
      children,
    },
    ref
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="data-[state=open]:animate-popup-overlay-in data-[state=closed]:animate-popup-overlay-out fixed inset-0 z-[1000] bg-black/50" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(popupContainerVariants({ size, resize }), className)}
        onPointerDownOutside={
          disableOutsideClickClose ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={
          disableEscapeKeyDownClose ? (e) => e.preventDefault() : undefined
        }
        aria-label={ariaLabel}
      >
        {!ariaLabel && (
          <DialogPrimitive.Title asChild>
            <VisuallyHidden>팝업</VisuallyHidden>
          </DialogPrimitive.Title>
        )}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
PopupContainer.displayName = "PopupContainer";

// ─────────────────────────────────────────────
// PopupNavigation
// ─────────────────────────────────────────────

interface PopupNavigationProps {
  variant?: NavigationVariant;
  children?: React.ReactNode;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode | null;
  className?: string;
}

const PopupNavigation: React.FC<PopupNavigationProps> = ({
  variant = "normal",
  children,
  leadingContent,
  trailingContent,
  className,
}) => {
  const defaultTrailing =
    trailingContent === undefined ? <PopupClose /> : trailingContent;

  return (
    <div
      role="heading"
      aria-level={2}
      className={cn(
        "border-line-solid-normal relative z-[1] flex min-h-[52px] shrink-0 items-center gap-1 border-b px-3",
        className
      )}
    >
      {leadingContent ?? <div className="w-9" />}
      {variant !== "floating" && (
        <DialogPrimitive.Title className={popupNavTitleVariants({ variant })}>
          {children}
        </DialogPrimitive.Title>
      )}
      {variant === "floating" && <div className="flex-1" />}
      {defaultTrailing}
    </div>
  );
};

// ─────────────────────────────────────────────
// PopupClose
// ─────────────────────────────────────────────

interface PopupCloseProps {
  children?: React.ReactNode;
  className?: string;
}

const PopupClose = React.forwardRef<HTMLButtonElement, PopupCloseProps>(
  ({ children, className }, ref) => (
    <DialogPrimitive.Close
      ref={ref}
      aria-label="닫기"
      className={cn(
        "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg",
        "text-label-neutral border-none bg-transparent p-0",
        "transition-[background,color] duration-[120ms] ease-in",
        "hover:bg-fill-alternative",
        "focus-visible:outline-primary-normal focus-visible:outline-2 focus-visible:outline-offset-[1px]",
        className
      )}
    >
      {children ?? <Close width={20} height={20} />}
    </DialogPrimitive.Close>
  )
);
PopupClose.displayName = "PopupClose";

// ─────────────────────────────────────────────
// PopupContent
// ─────────────────────────────────────────────

interface PopupContentProps {
  children: React.ReactNode;
  className?: string;
}

const PopupContent: React.FC<PopupContentProps> = ({ children, className }) => (
  <div
    className={cn(
      "flex flex-1 flex-col gap-[var(--popup-padding,20px)] overflow-y-auto p-[var(--popup-padding,20px)]",
      "[scrollbar-color:#e0e0e0_transparent] [scrollbar-width:thin]",
      "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#e0e0e0]",
      className
    )}
  >
    {children}
  </div>
);

// ─────────────────────────────────────────────
// PopupContentItem
// ─────────────────────────────────────────────

interface PopupContentItemProps {
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

const PopupContentItem: React.FC<PopupContentItemProps> = ({
  children,
  align = "left",
  className,
}) => (
  <div
    className={cn(
      "flex flex-col gap-2",
      align === "center" ? "items-center text-center" : "items-start text-left",
      className
    )}
  >
    {children}
  </div>
);

// ─────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────

const PopupHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn("text-headline-2-bold text-label-strong m-0", className)}>
    {children}
  </p>
);

const PopupSummary: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p
    className={cn(
      "text-label-1-normal-medium text-label-neutral m-0",
      className
    )}
  >
    {children}
  </p>
);

const PopupDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <DialogPrimitive.Description asChild>
    <p
      className={cn(
        "text-body-2-reading-regular text-label-assistive m-0",
        className
      )}
    >
      {children}
    </p>
  </DialogPrimitive.Description>
);

// ─────────────────────────────────────────────
// PopupActionArea
// ─────────────────────────────────────────────

interface PopupActionAreaProps {
  variant?: ActionAreaVariant;
  children: React.ReactNode;
  className?: string;
}

const PopupActionArea: React.FC<PopupActionAreaProps> = ({
  variant = "neutral",
  children,
  className,
}) => (
  <div className={cn(popupActionAreaVariants({ variant }), className)}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// PopupActionButton
// ─────────────────────────────────────────────

interface PopupActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "assistive";
  fullWidth?: boolean;
}

const PopupActionButton: React.FC<PopupActionButtonProps> = ({
  color = "primary",
  fullWidth = false,
  children,
  className,
  ...props
}) => (
  <Button
    variant="solid"
    color={color}
    size="medium"
    fullWidth={fullWidth}
    className={className}
    {...props}
  >
    {children}
  </Button>
);

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export {
  Popup,
  PopupTrigger,
  PopupContainer,
  PopupNavigation,
  PopupClose,
  PopupContent,
  PopupContentItem,
  PopupHeading,
  PopupSummary,
  PopupDescription,
  PopupActionArea,
  PopupActionButton,
};

export type {
  PopupSize,
  PopupResize,
  NavigationVariant,
  ActionAreaVariant,
  PopupProps,
  PopupContainerProps,
  PopupNavigationProps,
  PopupActionAreaProps,
  PopupActionButtonProps,
};
