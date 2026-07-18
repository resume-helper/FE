"use client";

import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const radioVariants = cva(
  [
    "relative flex shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-[0.43]",
  ],
  {
    variants: {
      size: {
        small: "size-4",
        medium: "size-[18px]",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

const labelVariants = cva("", {
  variants: {
    size: {
      small: "text-label-1-normal-regular py-[2px]",
      medium: "text-body-2-normal-regular py-[2px]",
    },
    bold: {
      true: "font-semibold",
      false: "",
    },
    disabled: {
      true: "text-label-disable",
      false: "text-label-normal",
    },
  },
  defaultVariants: {
    size: "medium",
    bold: false,
    disabled: false,
  },
});

type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioPrimitive.Root
>;

const RadioGroup = ({
  orientation = "vertical",
  className,
  ...props
}: RadioGroupProps) => (
  <RadioPrimitive.Root
    orientation={orientation}
    className={cn(
      "flex gap-2",
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
      className
    )}
    {...props}
  />
);

type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
  "asChild"
> & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  bold?: boolean;
  right?: boolean;
  tight?: boolean;
  typography?: string;
  typographyColor?: string;
};

const RadioGroupItem = ({
  label,
  size = "medium",
  bold = false,
  right = false,
  tight = false,
  typography,
  typographyColor,
  disabled,
  className,
  ...props
}: RadioGroupItemProps) => (
  <label
    className={cn(
      "inline-flex cursor-pointer items-start gap-1",
      right && "flex-row-reverse",
      disabled && "cursor-not-allowed",
      className
    )}
  >
    <span className={cn("group relative shrink-0", tight ? "p-0" : "p-1")}>
      <RadioPrimitive.Item
        {...props}
        disabled={disabled}
        className={cn(
          radioVariants({ size }),
          "border-line-normal-neutral data-[state=checked]:border-primary-normal data-[state=checked]:bg-primary-normal cursor-pointer"
        )}
      >
        <RadioPrimitive.Indicator className="bg-static-white size-1.5 rounded-full" />
      </RadioPrimitive.Item>
      <span
        aria-hidden="true"
        className={cn(
          "bg-primary-normal pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-150",
          "group-hover:opacity-[0.08] group-active:opacity-[0.12]",
          disabled && "hidden"
        )}
      />
    </span>

    {label != null && (
      <span
        className={cn(
          labelVariants({ size, bold, disabled: disabled ?? false }),
          typography,
          typographyColor
        )}
      >
        {label}
      </span>
    )}
  </label>
);

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
