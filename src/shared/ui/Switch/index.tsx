"use client";

import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const switchVariants = cva(
  [
    "relative inline-flex shrink-0 flex-none items-center overflow-hidden rounded-full cursor-pointer",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-[0.43]",
  ],
  {
    variants: {
      platform: {
        normal: "",
        ios: "",
      },
      size: {
        small: "h-6 w-[39px] p-0.5",
        medium: "h-8 w-[52px] p-0.5",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        platform: "normal",
        checked: false,
        className: "bg-fill-alternative shadow-[0_2px_3px_rgba(0,0,0,0.08)]",
      },
      {
        platform: "normal",
        checked: true,
        className: "bg-primary-normal shadow-[0_2px_3px_rgba(0,0,0,0.08)]",
      },
      {
        platform: "ios",
        checked: false,
        className: "bg-fill-alternative shadow-[0_2px_3px_rgba(0,0,0,0.08)]",
      },
      {
        platform: "ios",
        checked: true,
        className: "bg-primary-normal shadow-[0_2px_3px_rgba(0,0,0,0.08)]",
      },
    ],
    defaultVariants: {
      platform: "normal",
      size: "medium",
      checked: false,
    },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none rounded-full bg-static-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
    "transition-transform duration-300 will-change-transform",
  ],
  {
    variants: {
      size: {
        small: "size-5",
        medium: "size-7",
      },
      platform: {
        normal: "",
        ios: "",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "small",
        checked: true,
        className: "translate-x-[15px]",
      },
      {
        size: "small",
        checked: false,
        className: "translate-x-0",
      },
      {
        size: "medium",
        checked: true,
        className: "translate-x-5",
      },
      {
        size: "medium",
        checked: false,
        className: "translate-x-0",
      },
      {
        platform: "ios",
        checked: true,
        className: "shadow-[0_1px_2px_rgba(0,0,0,0.16)]",
      },
    ],
    defaultVariants: {
      size: "medium",
      platform: "normal",
      checked: false,
    },
  }
);

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "children"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "small" | "medium";
  platform?: "normal" | "ios";
};

const Switch = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "medium",
  platform = "normal",
  disabled,
  className,
  onClick,
  type = "button",
  ...props
}: SwitchProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const currentChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const nextChecked = !currentChecked;
    if (!isControlled) setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  };

  return (
    <button
      {...props}
      type={type}
      role="switch"
      aria-checked={currentChecked}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        toggle();
      }}
      className={cn(
        switchVariants({ platform, size, checked: currentChecked }),
        className
      )}
    >
      <span
        className={cn(
          thumbVariants({ platform, size, checked: currentChecked }),
          currentChecked &&
            platform === "normal" &&
            "shadow-[0_1px_2px_rgba(0,0,0,0.22)]"
        )}
      />
    </button>
  );
};

export { Switch };
export type { SwitchProps };
