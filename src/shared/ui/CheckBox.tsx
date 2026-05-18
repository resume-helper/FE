import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Check, Minus } from "../icons";

const boxVariants = cva(
  [
    "relative flex items-center justify-center shrink-0 rounded-[5px]",
    "border-[1.5px] transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
  ],
  {
    variants: {
      size: {
        small: "size-4",
        medium: "size-[18px]",
      },
      isActive: {
        true: "bg-primary-normal border-primary-normal text-static-white",
        false: "bg-transparent border-line-normal-neutral text-transparent",
      },
    },
    defaultVariants: {
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
  size?: "small" | "medium";
  bold?: boolean;
  label?: React.ReactNode;
  typography?: string;
  typographyColor?: string;
};

function CheckBox({
  size = "medium",
  bold = false,
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
}: CheckBoxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<
    boolean | "indeterminate"
  >(defaultChecked);

  const currentChecked = isControlled ? checked : internalChecked;
  const isActive =
    currentChecked === true || currentChecked === "indeterminate";

  const iconSize = size === "small" ? "14px" : "16px";

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-start gap-1",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <div className="relative shrink-0 p-1">
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
            boxVariants({ size, isActive }),
            "cursor-pointer disabled:cursor-not-allowed disabled:opacity-[0.43]"
          )}
        >
          {currentChecked === "indeterminate" ? (
            <Minus style={{ fontSize: iconSize }} />
          ) : (
            <Check style={{ fontSize: iconSize }} />
          )}
        </Checkbox.Root>
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-opacity duration-150",
            isActive ? "bg-primary-normal" : "bg-label-normal",
            "hover:opacity-[0.08] active:opacity-[0.12]",
            disabled && "hidden"
          )}
        />
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
}

export { CheckBox };
export type { CheckBoxProps };
