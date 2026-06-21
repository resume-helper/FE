"use client";

import { useId, useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { ChevronDown, ChevronUp, CircleExclamationFill } from "@/shared/icons";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
} from "@/shared/ui/Menu";

// ─── Interaction layer CVA ─────────────────────────────────────────────────────

const interactionVariants = cva(
  "absolute inset-0 rounded-xl pointer-events-none border transition-[border-color,border-width] duration-150 ease-out",
  {
    variants: {
      status: {
        normal:
          "border-line-normal-neutral group-hover:border-primary-normal/43 group-hover:border-2 group-focus-visible:border-primary-normal/43 group-focus-visible:border-2 group-data-[state=open]:border-primary-normal/43 group-data-[state=open]:border-2",
        negative:
          "border-status-negative/28! group-hover:border-2 group-data-[state=open]:border-2",
      },
      disabled: {
        true: "opacity-0",
        false: "",
      },
    },
    defaultVariants: {
      status: "normal",
      disabled: false,
    },
  }
);

// ─── Types ─────────────────────────────────────────────────────────────────────

type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SelectProps = {
  label?: React.ReactNode;
  heading?: boolean;
  requiredBadge?: boolean;
  description?: React.ReactNode;
  status?: "normal" | "negative" | "invalid";
  render?: "text" | "chip";
  overflow?: boolean;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  options?: SelectOption[];
  className?: string;

  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
  children?: React.ReactNode;
};

// ─── Select ────────────────────────────────────────────────────────────────────

const Select = ({
  label,
  heading = true,
  requiredBadge,
  description,
  status = "normal",
  render = "text",
  overflow = false,
  placeholder = "선택해주세요.",
  leadingIcon,
  options = [],
  className,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  onBlur,
  disabled,
  name,
  children,
}: SelectProps) => {
  const autoId = useId();
  const resolvedStatus = status === "invalid" ? "negative" : status;
  const isChipControlled = Array.isArray(value);
  const [internalChipValues, setInternalChipValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  const [internalChipOpen, setInternalChipOpen] = useState(
    defaultOpen ?? false
  );
  const selectedChipValues = isChipControlled ? value : internalChipValues;
  const chipOpen = disabled ? false : (open ?? internalChipOpen);

  const updateChipValues = (nextValues: string[]) => {
    if (!isChipControlled) setInternalChipValues(nextValues);
    onValueChange?.(nextValues);
  };

  if (render === "chip") {
    const selectedOptions = options.filter((option) =>
      selectedChipValues.includes(option.value)
    );

    return (
      <Menu
        value={selectedChipValues}
        onValueChange={(nextValue) =>
          updateChipValues(Array.isArray(nextValue) ? nextValue : [nextValue])
        }
        open={chipOpen}
        onOpenChange={(nextOpen) => {
          if (disabled) return;
          if (open === undefined) setInternalChipOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
      >
        <div className={cn("flex flex-col gap-2", className)}>
          {heading && label != null && (
            <label
              id={autoId}
              className="text-label-1-normal-bold text-label-neutral flex items-center gap-0.5"
            >
              {label}
              {requiredBadge && (
                <span className="text-status-negative" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}

          <MenuTrigger>
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-labelledby={heading && label != null ? autoId : undefined}
              aria-haspopup="listbox"
              aria-expanded={chipOpen}
              aria-invalid={resolvedStatus === "negative" || undefined}
              aria-disabled={disabled || undefined}
              className={cn(
                "group relative flex min-h-12 w-full min-w-0 items-center gap-3 rounded-xl p-3 text-left outline-none",
                disabled ? "cursor-not-allowed opacity-36" : "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-xl backdrop-blur-[32px]",
                  disabled
                    ? "bg-fill-alternative"
                    : "bg-background-elevated-normal"
                )}
              />

              <div className="relative flex min-w-0 flex-1 items-center gap-2">
                {leadingIcon != null && (
                  <span className="text-label-alternative shrink-0 text-[24px]">
                    {leadingIcon}
                  </span>
                )}

                <span
                  className={cn(
                    "flex min-w-0 flex-1 gap-1",
                    overflow ? "flex-wrap" : "overflow-hidden"
                  )}
                >
                  {selectedOptions.length > 0 ? (
                    selectedOptions.map((option) => (
                      <span
                        key={option.value}
                        className="bg-fill-normal text-label-alternative text-caption-1-medium inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1"
                      >
                        {option.label}
                        <span
                          role="button"
                          tabIndex={disabled ? -1 : 0}
                          aria-label={`${option.value} 제거`}
                          onPointerDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (disabled) return;
                            updateChipValues(
                              selectedChipValues.filter(
                                (value) => value !== option.value
                              )
                            );
                          }}
                          onKeyDown={(event) => {
                            if (event.key !== "Enter" && event.key !== " ") {
                              return;
                            }
                            event.preventDefault();
                            event.stopPropagation();
                            if (disabled) return;
                            updateChipValues(
                              selectedChipValues.filter(
                                (value) => value !== option.value
                              )
                            );
                          }}
                          className="cursor-pointer"
                        >
                          ×
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-body-1-normal-regular text-label-assistive truncate">
                      {placeholder}
                    </span>
                  )}
                </span>

                {resolvedStatus === "negative" && (
                  <span className="text-status-negative shrink-0 text-[22px]">
                    <CircleExclamationFill />
                  </span>
                )}

                <ChevronDown className="text-label-alternative size-4 shrink-0 transition-transform duration-150 group-data-[state=open]:rotate-180" />
              </div>

              <div
                className={interactionVariants({
                  status: resolvedStatus,
                  disabled,
                })}
              />
            </div>
          </MenuTrigger>

          {description != null && (
            <p
              className={cn(
                "text-caption-1-regular",
                resolvedStatus === "negative"
                  ? "text-status-negative"
                  : "text-label-alternative"
              )}
            >
              {description}
            </p>
          )}
        </div>

        <MenuContent className="w-(--radix-popover-trigger-width)">
          <MenuList>
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                variant="checkbox"
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </MenuContent>
      </Menu>
    );
  }

  return (
    <SelectPrimitive.Root
      value={typeof value === "string" ? value : undefined}
      defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disabled}
      name={name}
    >
      <div className={cn("flex flex-col gap-2", className)}>
        {heading && label != null && (
          <label
            id={autoId}
            className="text-label-1-normal-bold text-label-neutral flex items-center gap-0.5"
          >
            {label}
            {requiredBadge && (
              <span className="text-status-negative" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <SelectPrimitive.Trigger
          aria-labelledby={heading && label != null ? autoId : undefined}
          aria-invalid={resolvedStatus === "negative" || undefined}
          onBlur={onBlur}
          className={cn(
            "group relative flex min-h-12 w-full min-w-0 items-center gap-3 rounded-xl p-3 text-left",
            "outline-none",
            "disabled:cursor-not-allowed",
            disabled && "opacity-36"
          )}
        >
          {/* 배경 레이어 */}
          <div
            className={cn(
              "absolute inset-0 rounded-xl backdrop-blur-[32px]",
              disabled ? "bg-fill-alternative" : "bg-background-elevated-normal"
            )}
          />

          {/* 콘텐츠 */}
          <div className="relative flex min-w-0 flex-1 items-center gap-2">
            {leadingIcon != null && (
              <span className="text-label-alternative shrink-0 text-[24px]">
                {leadingIcon}
              </span>
            )}

            <span
              className={cn(
                "text-body-1-normal-regular min-w-0 flex-1",
                overflow ? "break-words whitespace-normal" : "truncate"
              )}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>

            {resolvedStatus === "negative" && (
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
          <div
            className={interactionVariants({
              status: resolvedStatus,
              disabled,
            })}
          />
        </SelectPrimitive.Trigger>

        {description != null && (
          <p
            className={cn(
              "text-caption-1-regular",
              resolvedStatus === "negative"
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
};

// ─── SelectContent ─────────────────────────────────────────────────────────────

const SelectContent = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) => {
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
};

// ─── SelectItem ────────────────────────────────────────────────────────────────

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
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
};

// ─── SelectGroup / SelectLabel / SelectSeparator ───────────────────────────────

const SelectGroup = SelectPrimitive.Group;

const SelectLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      className={cn(
        "text-caption-1-medium text-label-alternative px-4 py-2",
        className
      )}
      {...props}
    />
  );
};

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator
      className={cn("bg-line-normal-neutral my-1 h-px", className)}
      {...props}
    />
  );
};

export {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
export type { SelectProps, SelectItemProps, SelectOption };
