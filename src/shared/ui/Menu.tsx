"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/shared/lib/cn";
import { Check } from "@/shared/icons";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type MenuItemVariant = "normal" | "radio" | "checkbox";
export type MenuValue = string | string[];

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

interface MenuContextValue {
  value: MenuValue;
  onValueChange: (val: string) => void;
  close: () => void;
}

const MenuContext = React.createContext<MenuContextValue>({
  value: "",
  onValueChange: () => {},
  close: () => {},
});

// ─────────────────────────────────────────────
// 아이콘
// ─────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RadioIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <span className="bg-primary-normal flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full">
        <span className="bg-static-white h-2 w-2 rounded-full" />
      </span>
    );
  }
  return (
    <span
      className="bg-background-normal h-[18px] w-[18px] shrink-0 rounded-full"
      style={{
        boxShadow: "inset 0 0 0 1.5px var(--semantic-line-normal-neutral)",
      }}
    />
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px]",
        checked ? "bg-primary-normal" : "bg-background-normal"
      )}
      style={{
        boxShadow: checked
          ? "inset 0 0 0 1.5px var(--semantic-primary-normal)"
          : "inset 0 0 0 1.5px var(--semantic-line-normal-neutral)",
      }}
    >
      {checked && <Check width={16} height={16} className="text-white" />}
    </span>
  );
}

// ─────────────────────────────────────────────
// Menu
// ─────────────────────────────────────────────

export interface MenuProps {
  defaultValue?: MenuValue;
  value?: MenuValue;
  onValueChange?: (value: MenuValue) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Menu({
  defaultValue = "",
  value: valueProp,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  children,
}: MenuProps) {
  const [internalValue, setInternalValue] =
    React.useState<MenuValue>(defaultValue);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isOpenControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const handleValueChange = (val: string) => {
    if (Array.isArray(value)) {
      const next = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    } else {
      if (!isControlled) setInternalValue(val);
      onValueChange?.(val);
      handleOpenChange(false);
    }
  };

  const close = () => handleOpenChange(false);

  return (
    <MenuContext.Provider
      value={{ value, onValueChange: handleValueChange, close }}
    >
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    </MenuContext.Provider>
  );
}
Menu.displayName = "Menu";

// ─────────────────────────────────────────────
// MenuTrigger
// ─────────────────────────────────────────────

export interface MenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function MenuTrigger({ children, asChild = true }: MenuTriggerProps) {
  return (
    <PopoverPrimitive.Trigger asChild={asChild}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}
MenuTrigger.displayName = "MenuTrigger";

// ─────────────────────────────────────────────
// MenuContent
// ─────────────────────────────────────────────

export interface MenuContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  forceMount?: boolean;
}

export function MenuContent({
  children,
  className,
  style,
  sideOffset = 8,
  side = "bottom",
  align = "start",
  forceMount,
}: MenuContentProps) {
  return (
    <PopoverPrimitive.Portal forceMount={forceMount || undefined}>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex flex-col overflow-hidden",
          "max-h-[400px] max-w-[320px] min-w-[140px]",
          "border-line-solid-normal bg-background-elevated-normal rounded-xl border",
          "shadow-elevation-normal-medium",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={style}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
MenuContent.displayName = "MenuContent";

// ─────────────────────────────────────────────
// MenuList
// ─────────────────────────────────────────────

export interface MenuListProps {
  children?: React.ReactNode;
  className?: string;
}

export function MenuList({ children, className }: MenuListProps) {
  return (
    <div
      role="listbox"
      className={cn(
        "flex-1 overflow-y-auto py-1",
        "scrollbar-thin scrollbar-thumb-line-solid-normal scrollbar-track-transparent",
        className
      )}
    >
      {children}
    </div>
  );
}
MenuList.displayName = "MenuList";

// ─────────────────────────────────────────────
// MenuGroup
// ─────────────────────────────────────────────

export interface MenuGroupProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function MenuGroup({ title, children, className }: MenuGroupProps) {
  return (
    <div role="group" className={cn("flex flex-col", className)}>
      {title && (
        <div className="bg-background-elevated-normal text-caption-1-bold text-label-alternative sticky top-0 z-10 px-4 py-2">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
MenuGroup.displayName = "MenuGroup";

// ─────────────────────────────────────────────
// MenuItemContent
// ─────────────────────────────────────────────

export type MenuItemContentVariant =
  | "icon"
  | "icon-button"
  | "badge"
  | "avatar"
  | "large-icon"
  | "value"
  | "thumbnail"
  | "button"
  | "text-button"
  | "custom"
  | "radio"
  | "checkbox"
  | "chevron"
  | "switch";

export interface MenuItemContentProps {
  variant?: MenuItemContentVariant;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function MenuItemContent({
  children,
  disabled,
  className,
}: MenuItemContentProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center",
        disabled && "pointer-events-none opacity-40",
        className
      )}
    >
      {children}
    </span>
  );
}
MenuItemContent.displayName = "MenuItemContent";

// ─────────────────────────────────────────────
// MenuItem
// ─────────────────────────────────────────────

export interface MenuItemProps {
  value: string;
  variant?: MenuItemVariant;
  disabled?: boolean;
  divider?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function MenuItem({
  value,
  variant = "normal",
  disabled = false,
  divider = false,
  leadingContent,
  trailingContent,
  children,
  className,
}: MenuItemProps) {
  const { value: selectedValue, onValueChange } = React.useContext(MenuContext);

  const isChecked = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value;

  const handleClick = () => {
    if (disabled) return;
    onValueChange(value);
  };

  const leadingNode =
    leadingContent ??
    (variant === "radio" ? (
      <RadioIcon checked={isChecked} />
    ) : variant === "checkbox" ? (
      <CheckboxIcon checked={isChecked} />
    ) : null);

  const trailingNode =
    trailingContent ??
    (variant === "normal" && isChecked ? <CheckIcon /> : null);

  return (
    <div
      role="option"
      aria-selected={isChecked}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "flex min-h-[44px] items-center gap-3 px-4 py-2.5",
        "cursor-pointer outline-none select-none",
        "text-label-1-normal-regular text-label-normal transition-colors duration-100",
        "hover:bg-fill-alternative",
        "focus-visible:bg-fill-normal",
        "active:bg-fill-normal",
        isChecked && variant === "normal" && "text-label-1-normal-medium",
        disabled && "pointer-events-none cursor-default opacity-40",
        divider && "border-line-solid-alternative border-b",
        className
      )}
    >
      {/* leading */}
      {leadingNode && (
        <span className="flex shrink-0 items-center">{leadingNode}</span>
      )}

      {/* 텍스트 */}
      <span className="min-w-0 flex-1">{children}</span>

      {/* trailing */}
      {trailingNode && (
        <span className="text-label-normal flex shrink-0 items-center">
          {trailingNode}
        </span>
      )}
    </div>
  );
}
MenuItem.displayName = "MenuItem";

// ─────────────────────────────────────────────
// MenuActionArea
// ─────────────────────────────────────────────

export type MenuActionAreaContentVariant =
  | "button"
  | "icon"
  | "icon-button"
  | "badge"
  | "text-button"
  | "chip-filter"
  | "custom";

export interface MenuActionAreaContentProps {
  variant?: MenuActionAreaContentVariant;
  children?: React.ReactNode;
  className?: string;
}

export function MenuActionAreaContent({
  children,
  className,
}: MenuActionAreaContentProps) {
  return (
    <span className={cn("flex shrink-0 items-center", className)}>
      {children}
    </span>
  );
}
MenuActionAreaContent.displayName = "MenuActionAreaContent";

export interface MenuActionAreaProps {
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function MenuActionArea({
  leadingContent,
  trailingContent,
  children,
  className,
}: MenuActionAreaProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        "border-line-solid-alternative shrink-0 border-t px-4 py-3",
        className
      )}
    >
      {leadingContent && (
        <span className="flex items-center">{leadingContent}</span>
      )}
      {children}
      {trailingContent && (
        <span className="ml-auto flex items-center">{trailingContent}</span>
      )}
    </div>
  );
}
MenuActionArea.displayName = "MenuActionArea";
