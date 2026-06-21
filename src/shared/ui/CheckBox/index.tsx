import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Check, Minus } from "../../icons";

const boxVariants = cva(
  [
    "relative flex items-center justify-center shrink-0 rounded-[5px]",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        checkbox: "",
        checkmark: "rounded-sm",
      },
      size: {
        small: "size-4",
        medium: "size-[18px]",
      },
      isActive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "checkbox",
        isActive: true,
        className:
          "border-[1.5px] bg-primary-normal border-primary-normal text-static-white",
      },
      {
        variant: "checkbox",
        isActive: false,
        className:
          "border-[1.5px] bg-transparent border-line-normal-neutral text-transparent",
      },
      {
        variant: "checkmark",
        isActive: true,
        className: "border-0 bg-transparent text-primary-normal",
      },
      {
        variant: "checkmark",
        isActive: false,
        className: "border-0 bg-transparent text-label-alternative",
      },
    ],
    defaultVariants: {
      variant: "checkbox",
      size: "medium",
      isActive: false,
    },
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

type CheckBoxProps = Omit<
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>,
  "asChild" | "checked"
> & {
  checked?: boolean | "indeterminate";
  variant?: "checkbox" | "checkmark";
  size?: "small" | "medium";
  bold?: boolean;
  right?: boolean;
  tight?: boolean;
  label?: React.ReactNode;
  typography?: string;
  typographyColor?: string;
};

const CheckBox = ({
  variant = "checkbox",
  size = "medium",
  bold = false,
  right = false,
  tight = false,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  typography,
  typographyColor,
  className,
  id,
  ...props
}: CheckBoxProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<
    boolean | "indeterminate"
  >(defaultChecked);

  const currentChecked = isControlled ? checked : internalChecked;
  const isActive =
    currentChecked === true || currentChecked === "indeterminate";

  const iconSize =
    variant === "checkmark"
      ? size === "small"
        ? "28px"
        : "32px"
      : size === "small"
        ? "14px"
        : "16px";

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-start gap-1",
        right && "flex-row-reverse",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <div className={cn("group relative shrink-0", tight ? "p-0" : "p-1")}>
        <Checkbox.Root
          {...props}
          id={id}
          checked={currentChecked}
          onCheckedChange={(v) => {
            if (!isControlled) setInternalChecked(v);
            onCheckedChange?.(v);
          }}
          disabled={disabled ?? false}
          className={cn(
            boxVariants({ variant, size, isActive }),
            variant === "checkbox" &&
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-[0.43]",
            variant === "checkmark" &&
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-[0.43]"
          )}
        >
          {currentChecked === "indeterminate" ? (
            <Minus style={{ width: iconSize, height: iconSize }} />
          ) : (
            <Check style={{ width: iconSize, height: iconSize }} />
          )}
        </Checkbox.Root>
        {variant === "checkbox" && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
              isActive ? "bg-primary-normal" : "bg-label-normal",
              "group-hover:opacity-[0.08] group-active:opacity-[0.12]",
              disabled && "hidden"
            )}
          />
        )}
      </div>

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
};

export { CheckBox };
export type { CheckBoxProps };
