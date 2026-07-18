"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { CheckBox, type CheckBoxProps } from "@/shared/ui/CheckBox";

type CheckboxGroupContextValue = {
  value: string[];
  disabled: boolean;
  variant: "checkbox" | "checkmark";
  toggle: (value: string, checked: boolean) => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null
);

type CheckboxGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "checkbox" | "checkmark";
  disabled?: boolean;
};

const CheckboxGroup = ({
  value,
  defaultValue = [],
  onValueChange,
  orientation = "vertical",
  variant = "checkbox",
  disabled = false,
  className,
  children,
  ...props
}: CheckboxGroupProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const toggle = (itemValue: string, checked: boolean) => {
    const nextValue = checked
      ? [...new Set([...currentValue, itemValue])]
      : currentValue.filter((value) => value !== itemValue);

    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{ value: currentValue, disabled, variant, toggle }}
    >
      <div
        role="group"
        className={cn(
          "flex gap-2",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

type CheckboxGroupItemProps = Omit<
  CheckBoxProps,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  value: string;
  variant?: "checkbox" | "checkmark";
};

const CheckboxGroupItem = ({
  value,
  variant,
  disabled,
  ...props
}: CheckboxGroupItemProps) => {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error("CheckboxGroupItem must be used within CheckboxGroup");
  }

  return (
    <CheckBox
      {...props}
      variant={variant ?? context.variant}
      checked={context.value.includes(value)}
      disabled={context.disabled || disabled}
      onCheckedChange={(checked) => context.toggle(value, checked === true)}
    />
  );
};

export { CheckboxGroup, CheckboxGroupItem };
export type { CheckboxGroupProps, CheckboxGroupItemProps };
