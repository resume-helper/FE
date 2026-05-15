import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const chipVariants = cva(
  [
    "relative inline-flex cursor-pointer items-center overflow-hidden select-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "after:absolute after:inset-0",
    "after:opacity-0 after:transition-opacity after:duration-150",
    "hover:after:opacity-[0.05] focus-visible:after:opacity-[0.08] active:after:opacity-[0.12]",
    "disabled:after:hidden",
  ],
  {
    variants: {
      variant: {
        solid: "",
        outlined: "",
      },
      size: {
        xsmall: "px-1.75 py-1 gap-0.5 rounded-md",
        small: "px-2 py-1.5 gap-0.5 rounded-lg",
        medium: "px-2.75 py-1.75 gap-0.75 rounded-[10px]",
        large: "px-3 py-2.25 gap-0.75 rounded-[10px]",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        active: false,
        className:
          "bg-fill-alternative after:bg-label-normal after:rounded-[inherit]",
      },
      {
        variant: "solid",
        active: true,
        className:
          "bg-label-strong border border-label-strong after:bg-inverse-label after:rounded-[inherit]",
      },
      {
        variant: "outlined",
        active: false,
        className:
          "border border-line-normal-neutral after:bg-label-normal after:rounded-[inherit]",
      },
      {
        variant: "outlined",
        active: true,
        className:
          "bg-primary-normal/5 border border-primary-normal/43 after:bg-primary-normal after:rounded-[inherit]",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "medium",
      active: false,
    },
  }
);

const textClassMap = {
  xsmall: "text-caption-1 font-medium",
  small: "text-label-1-normal font-medium",
  medium: "text-body-2-normal font-medium",
  large: "text-body-2-normal font-medium",
} as const;

const iconSizeMap = {
  xsmall: "text-[12px] py-0.5",
  small: "text-[14px] py-0.75",
  medium: "text-[14px] py-1",
  large: "text-[16px] py-0.75",
} as const;

const textColorMap = {
  "solid-inactive": "text-label-alternative",
  "solid-active": "text-inverse-label",
  "outlined-inactive": "text-label-alternative",
  "outlined-active": "text-primary-normal",
} as const;

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof chipVariants>, "active"> & {
    active?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
  };

function Chip({
  variant = "solid",
  size = "medium",
  active = false,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  className,
  ...props
}: ChipProps) {
  const textColor = disabled
    ? "text-label-disable"
    : textColorMap[
        `${variant ?? "solid"}-${active ? "active" : "inactive"}` as keyof typeof textColorMap
      ];

  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-pressed={active}
      className={cn(
        chipVariants({ variant, size, active }),
        disabled && "bg-interaction-disable border-transparent",
        className
      )}
    >
      <span className="relative flex items-center gap-[inherit]">
        {leadingIcon && (
          <span
            className={cn("flex items-center", iconSizeMap[size ?? "medium"])}
          >
            {leadingIcon}
          </span>
        )}
        <span
          className={cn("px-0.5", textClassMap[size ?? "medium"], textColor)}
        >
          {children}
        </span>
        {trailingIcon && (
          <span
            className={cn("flex items-center", iconSizeMap[size ?? "medium"])}
          >
            {trailingIcon}
          </span>
        )}
      </span>
    </button>
  );
}

export { Chip, chipVariants };
export type { ChipProps };
