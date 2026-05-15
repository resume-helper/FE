"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type TabSize = "small" | "medium" | "large";
export type TabResize = "hug" | "fill";
export type TabPanelMountMode = "only-active" | "force-mount" | "always";

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_CONFIG: Record<
  TabSize,
  { height: string; fontSize: string; px: string }
> = {
  small: { height: "40px", fontSize: "13px", px: "12px" },
  medium: { height: "44px", fontSize: "14px", px: "14px" },
  large: { height: "48px", fontSize: "15px", px: "16px" },
};

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

interface TabContextValue {
  size: TabSize;
  resize: TabResize;
}
const TabContext = React.createContext<TabContextValue>({
  size: "large",
  resize: "hug",
});

// indicator 위치 계산을 위한 ref 공유
const TabListRefContext = React.createContext<
  React.RefObject<HTMLDivElement | null>
>({
  current: null,
});

// ─────────────────────────────────────────────
// Tab
// ─────────────────────────────────────────────

export interface TabProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disableScrollMoveOnChange?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Tab({
  defaultValue,
  value,
  onValueChange,
  disableScrollMoveOnChange = false,
  children,
  className,
  style,
}: TabProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (val: string) => {
    onValueChange?.(val);
    if (!disableScrollMoveOnChange && listRef.current) {
      const active = listRef.current.querySelector<HTMLElement>(
        "[data-state='active']"
      );
      active?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      className={cn("flex w-full flex-col", className)}
      style={style}
    >
      <TabListRefContext.Provider value={listRef}>
        {children}
      </TabListRefContext.Provider>
    </TabsPrimitive.Root>
  );
}
Tab.displayName = "Tab";

// ─────────────────────────────────────────────
// TabList
// ─────────────────────────────────────────────

export interface TabListProps {
  size?: TabSize;
  resize?: TabResize;
  horizontalPadding?: boolean;
  iconButton?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TabList({
  size = "large",
  resize = "hug",
  horizontalPadding = false,
  iconButton,
  children,
  className,
  style,
}: TabListProps) {
  const listRef = React.useContext(TabListRefContext);
  const cfg = SIZE_CONFIG[size];

  // ── 슬라이딩 indicator 위치 계산 ───────────
  const [indicatorStyle, setIndicatorStyle] =
    React.useState<React.CSSProperties>({});

  const updateIndicator = React.useCallback(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>(
      "[data-state='active']"
    );
    if (!active) return;
    const listRect = listRef.current.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicatorStyle({
      width: activeRect.width,
      transform: `translateX(${activeRect.left - listRect.left + listRef.current.scrollLeft}px)`,
    });
  }, [listRef]);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    updateIndicator();

    const observer = new MutationObserver(updateIndicator);
    observer.observe(el, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    });
    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <TabContext.Provider value={{ size, resize }}>
      <div
        className={cn("relative flex w-full items-end", className)}
        style={style}
      >
        {/* 탭 목록 스크롤 영역 */}
        <TabsPrimitive.List
          ref={listRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "relative flex min-w-0 flex-1 items-end",
            resize === "hug"
              ? "scrollbar-none overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "overflow-x-hidden",
            resize === "fill" && "w-full",
            "border-b border-[#E9ECEF]",
            horizontalPadding && resize !== "fill" && "px-4"
          )}
          style={{ height: cfg.height }}
          aria-label="Tab"
        >
          {children}

          {/* 슬라이딩 active indicator */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#1B1C1E] transition-transform duration-200 ease-out"
            style={indicatorStyle}
          />
        </TabsPrimitive.List>

        {/* 우측 고정 아이콘 버튼 */}
        {iconButton && (
          <div
            className="flex shrink-0 items-center self-center pr-0 pb-0 pl-2"
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
    </TabContext.Provider>
  );
}
TabList.displayName = "TabList";

// ─────────────────────────────────────────────
// TabListItem
// ─────────────────────────────────────────────

export interface TabListItemProps {
  value: string;
  disabled?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TabListItem({
  value,
  disabled = false,
  children,
  className,
  style,
}: TabListItemProps) {
  const { size, resize } = React.useContext(TabContext);
  const cfg = SIZE_CONFIG[size];

  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        "cursor-pointer whitespace-nowrap select-none",
        "transition-colors duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-[-2px]",
        "disabled:pointer-events-none disabled:opacity-40",
        "font-medium text-[#9EA7B2]",
        "hover:text-[#495057]",
        "data-[state=active]:text-[#1B1C1E]",
        resize === "fill" && "flex-1",
        className
      )}
      style={{
        height: cfg.height,
        paddingLeft: cfg.px,
        paddingRight: cfg.px,
        fontSize: cfg.fontSize,
        ...style,
      }}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}
TabListItem.displayName = "TabListItem";

// ─────────────────────────────────────────────
// TabPanel
// ─────────────────────────────────────────────

export interface TabPanelProps {
  value: string;
  mountMode?: TabPanelMountMode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TabPanel({
  value,
  mountMode = "force-mount",
  children,
  className,
  style,
}: TabPanelProps) {
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
      onFocus={() => setHasBeenActive(true)}
    >
      {mountMode === "only-active" && !hasBeenActive ? null : children}
    </TabsPrimitive.Content>
  );
}
TabPanel.displayName = "TabPanel";
