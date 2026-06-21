"use client";

import { useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { ChevronDown, ChevronUp, CircleExclamationFill } from "@/shared/icons";

// ─── Interaction layer CVA ─────────────────────────────────────────────────────

const interactionVariants = cva(
  "absolute inset-0 rounded-xl pointer-events-none border transition-colors duration-150",
  {
    variants: {
      status: {
        default: "border-line-normal-neutral",
        invalid: "border-status-negative/28",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

// ─── Types ─────────────────────────────────────────────────────────────────────

type SelectProps = {
  label?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
  status?: "default" | "invalid";
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  className?: string;

  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
  children: React.ReactNode;
};

// ─── Select ────────────────────────────────────────────────────────────────────

function Select({
  label,
  required,
  description,
  status = "default",
  placeholder = "선택해주세요.",
  leadingIcon,
  className,
  value,
  defaultValue,
  onValueChange,
  onBlur,
  disabled,
  name,
  children,
}: SelectProps) {
  const autoId = useId();

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <div className={cn("flex flex-col gap-2", className)}>
        {label != null && (
          <label
            id={autoId}
            className="text-label-1-normal-bold text-label-neutral flex items-center gap-0.5"
          >
            {label}
            {required && (
              <span className="text-status-negative" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <SelectPrimitive.Trigger
          aria-labelledby={label != null ? autoId : undefined}
          onBlur={onBlur}
          className={cn(
            "group relative flex w-full min-w-0 items-center gap-3 rounded-xl p-3",
            "outline-none",
            "disabled:cursor-not-allowed disabled:opacity-36"
          )}
        >
          {/* 배경 레이어 */}
          <div className="bg-background-elevated-normal absolute inset-0 rounded-xl backdrop-blur-[32px]" />

          {/* 콘텐츠 */}
          <div className="relative flex min-w-0 flex-1 items-center gap-2">
            {leadingIcon != null && (
              <span className="text-label-alternative shrink-0 text-[24px]">
                {leadingIcon}
              </span>
            )}

            <span className="text-body-1-normal-regular min-w-0 flex-1 truncate text-left">
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>

            {status === "invalid" && (
              <span className="text-status-negative shrink-0 text-[22px]">
                <CircleExclamationFill />
              </span>
            )}

            <SelectPrimitive.Icon asChild>
              <span className="text-label-alternative inline-flex shrink-0 text-[16px] transition-transform duration-150 group-data-[state=open]:rotate-180">
                <ChevronDown />
              </span>
            </SelectPrimitive.Icon>
          </div>

          {/* 기본 border 레이어 */}
          <div className={interactionVariants({ status })} />

          {/* focused(open) border 레이어 */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-xl border-2 opacity-0 transition-opacity duration-150",
              "group-data-[state=open]:opacity-100",
              status === "invalid"
                ? "border-status-negative/28"
                : "border-primary-normal/43"
            )}
          />
        </SelectPrimitive.Trigger>

        {description != null && (
          <p
            className={cn(
              "text-caption-1-regular",
              status === "invalid"
                ? "text-status-negative"
                : "text-label-alternative"
            )}
          >
            {description}
          </p>
        )}
      </div>

      <SelectPrimitive.Portal>
        <SelectContent>{children}</SelectContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

// ─── SelectContent ─────────────────────────────────────────────────────────────

function SelectContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Content
      position="popper"
      sideOffset={4}
      className={cn(
        "bg-background-elevated-normal relative z-200 w-(--radix-select-trigger-width) overflow-hidden rounded-xl",
        "shadow-[0px_4px_24px_-4px_rgba(23,23,23,0.12)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
        <ChevronUp className="text-label-alternative size-4" />
      </SelectPrimitive.ScrollUpButton>

      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>

      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
        <ChevronDown className="text-label-alternative size-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  );
}

// ─── SelectItem ────────────────────────────────────────────────────────────────

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "text-body-1-normal-regular text-label-normal",
        "relative flex w-full cursor-pointer items-center rounded-lg px-4 py-3 select-none",
        "transition-colors duration-100 outline-none",
        "data-highlighted:bg-label-normal/5",
        "data-disabled:text-label-assistive data-disabled:cursor-not-allowed",
        "data-[state=checked]:text-primary-normal data-[state=checked]:text-body-1-normal-bold",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// ─── SelectGroup / SelectLabel / SelectSeparator ───────────────────────────────

const SelectGroup = SelectPrimitive.Group;

function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "text-caption-1-medium text-label-alternative px-4 py-2",
        className
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("bg-line-normal-neutral my-1 h-px", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
export type { SelectProps, SelectItemProps };
