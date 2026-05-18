import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import SvgCheck from "@/shared/icons/Check";

const controlVariants = cva(
  [
    "relative flex items-center justify-center shrink-0 rounded-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
    "after:absolute after:rounded-full after:inset-[-4px] after:opacity-0 after:transition-opacity after:duration-150",
    "hover:after:opacity-[0.08] active:after:opacity-[0.12]",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-[0.43] disabled:after:hidden",
  ],
  {
    variants: {
      size: {
        small: "size-5",
        medium: "size-6",
      },
      isChecked: {
        true: "text-primary-normal after:bg-primary-normal",
        false: "text-label-assistive after:bg-label-normal",
      },
      tight: {
        true: "border border-line-normal-normal",
        false: "",
      },
    },
    defaultVariants: {
      size: "medium",
      isChecked: false,
      tight: false,
    },
  }
);

const labelVariants = cva("", {
  variants: {
    size: {
      small: "text-label-1-normal-regular",
      medium: "text-body-2-normal-regular",
    },
    disabled: {
      true: "text-label-disable",
      false: "text-label-normal",
    },
  },
  defaultVariants: {
    size: "medium",
    disabled: false,
  },
});

type CheckMarkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>,
  "asChild" | "checked"
> & {
  checked?: boolean | "indeterminate";
  size?: "small" | "medium";
  tight?: boolean;
  label?: React.ReactNode;
  typography?: string;
  typographyColor?: string;
};

function CheckMark({
  size = "medium",
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
}: CheckMarkProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<
    boolean | "indeterminate"
  >(defaultChecked);

  const currentChecked = isControlled ? checked : internalChecked;
  const isChecked =
    currentChecked === true || currentChecked === "indeterminate";

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Checkbox.Root
        {...props}
        id={id}
        checked={currentChecked}
        onCheckedChange={(v) => {
          if (!isControlled) setInternalChecked(v);
          onCheckedChange?.(v);
        }}
        disabled={disabled ?? false}
        className={controlVariants({ size, tight, isChecked })}
      >
        <SvgCheck style={{ fontSize: size === "small" ? "20px" : "24px" }} />
      </Checkbox.Root>

      {label != null && (
        <label
          htmlFor={id}
          className={cn(
            labelVariants({ size, disabled: disabled ?? false }),
            typography,
            typographyColor,
            id ? (disabled ? "cursor-not-allowed" : "cursor-pointer") : ""
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { CheckMark };
export type { CheckMarkProps };
