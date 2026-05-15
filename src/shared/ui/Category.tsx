"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type CategorySize = "small" | "medium" | "large" | "xlarge";
export type CategoryVariant = "normal" | "alternative";
export type CategoryPanelMountMode = "only-active" | "force-mount" | "always";

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_CONFIG: Record<
  CategorySize,
  { height: string; fontSize: string; px: string; gap: string }
> = {
  small: { height: "32px", fontSize: "13px", px: "12px", gap: "4px" },
  medium: { height: "36px", fontSize: "14px", px: "14px", gap: "6px" },
  large: { height: "40px", fontSize: "15px", px: "16px", gap: "8px" },
  xlarge: { height: "44px", fontSize: "16px", px: "18px", gap: "8px" },
};

interface CategoryContextValue {
  size: CategorySize;
  variant: CategoryVariant;
}
const CategoryContext = React.createContext<CategoryContextValue>({
  size: "medium",
  variant: "normal",
});

// ─────────────────────────────────────────────
// Category
// ─────────────────────────────────────────────

export interface CategoryProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disableScrollMoveOnChange?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Category({
  defaultValue,
  value,
  onValueChange,
  disableScrollMoveOnChange = false,
  children,
  className,
  style,
}: CategoryProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (val: string) => {
    onValueChange?.(val);

    if (!disableScrollMoveOnChange && listRef.current) {
      const activeBtn = listRef.current.querySelector<HTMLElement>(
        `[data-state="active"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      className={cn("flex w-full flex-col", className)}
      style={style}
      data-list-ref-target
    >
      <CategoryListRefContext.Provider value={listRef}>
        {children}
      </CategoryListRefContext.Provider>
    </TabsPrimitive.Root>
  );
}
Category.displayName = "Category";

const CategoryListRefContext = React.createContext<
  React.RefObject<HTMLDivElement | null>
>({ current: null });

// ─────────────────────────────────────────────
// CategoryList
// ─────────────────────────────────────────────

export interface CategoryListProps {
  size?: CategorySize;
  variant?: CategoryVariant;
  horizontalPadding?: boolean;
  verticalPadding?: boolean;
  iconButton?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CategoryList({
  size = "medium",
  variant = "normal",
  horizontalPadding = false,
  verticalPadding = false,
  iconButton,
  children,
  className,
  style,
}: CategoryListProps) {
  const listRef = React.useContext(CategoryListRefContext);
  const cfg = SIZE_CONFIG[size];

  return (
    <CategoryContext.Provider value={{ size, variant }}>
      <div
        className={cn(
          "relative flex w-full items-center",
          verticalPadding && "py-2"
        )}
        style={style}
      >
        {/* 스크롤 영역 */}
        <TabsPrimitive.List
          ref={listRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex flex-row items-center gap-1 overflow-x-auto",
            "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "min-w-0 flex-1",
            horizontalPadding && "px-4",
            className
          )}
          style={{ height: cfg.height }}
          aria-label="Category"
        >
          {children}
        </TabsPrimitive.List>

        {/* 우측 고정 아이콘 버튼 */}
        {iconButton && (
          <div
            className="flex shrink-0 items-center bg-white pr-2 pl-2"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, white 20%)",
              paddingLeft: "16px",
              paddingRight: horizontalPadding ? "16px" : "0",
            }}
          >
            {iconButton}
          </div>
        )}
      </div>
    </CategoryContext.Provider>
  );
}
CategoryList.displayName = "CategoryList";

// ─────────────────────────────────────────────
// CategoryListItem
// ─────────────────────────────────────────────

export interface CategoryListItemProps {
  value: string;
  disabled?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

export function CategoryListItem({
  value,
  disabled = false,
  children,
  className,
}: CategoryListItemProps) {
  const { size, variant } = React.useContext(CategoryContext);
  const cfg = SIZE_CONFIG[size];

  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={cn(
        // 기본 레이아웃
        "relative inline-flex shrink-0 items-center justify-center",
        "cursor-pointer whitespace-nowrap select-none",
        "rounded-full border transition-all duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-40",

        // normal variant
        variant === "normal" && [
          "border-transparent bg-transparent text-[#9EA7B2]",
          "hover:bg-[#F1F3F5] hover:text-[#495057]",
          "data-[state=active]:border-transparent data-[state=active]:bg-[#1B1C1E] data-[state=active]:text-white",
        ],

        // alternative variant
        variant === "alternative" && [
          "border-[#DEE2E6] bg-transparent text-[#9EA7B2]",
          "hover:border-[#ADB5BD] hover:text-[#495057]",
          "data-[state=active]:border-[#1B1C1E] data-[state=active]:font-semibold data-[state=active]:text-[#1B1C1E]",
        ],

        className
      )}
      style={{
        height: cfg.height,
        paddingLeft: cfg.px,
        paddingRight: cfg.px,
        fontSize: cfg.fontSize,
        fontWeight: "inherit",
        gap: cfg.gap,
      }}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}
CategoryListItem.displayName = "CategoryListItem";

// ─────────────────────────────────────────────
// CategoryPanel
// ─────────────────────────────────────────────

export interface CategoryPanelProps {
  value: string;
  mountMode?: CategoryPanelMountMode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CategoryPanel({
  value,
  mountMode = "force-mount",
  children,
  className,
  style,
}: CategoryPanelProps) {
  const [hasBeenActive, setHasBeenActive] = React.useState(false);

  return (
    <TabsPrimitive.Content
      value={value}
      forceMount={mountMode !== "only-active" ? true : undefined}
      className={cn(
        "outline-none",
        mountMode !== "only-active" && "data-[state=inactive]:hidden",
        className
      )}
      style={style}
      onAnimationStart={() => setHasBeenActive(true)}
    >
      {mountMode === "only-active" && !hasBeenActive ? null : children}
    </TabsPrimitive.Content>
  );
}
CategoryPanel.displayName = "CategoryPanel";
