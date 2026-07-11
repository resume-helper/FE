"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/shared/lib/cn";
import { CaretDown } from "@/shared/icons";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type PaginationVariant = "extended" | "compact" | "minimize";

// ─────────────────────────────────────────────
// 페이지 범위 계산 유틸
// ─────────────────────────────────────────────

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function buildPageItems({
  current,
  total,
  boundary,
  sibling,
}: {
  current: number;
  total: number;
  boundary: number;
  sibling: number;
}): PageItem[] {
  if (total <= 1) return [1];

  const boundaryStart = Array.from(
    { length: Math.min(boundary, total) },
    (_, i) => i + 1
  );
  const boundaryEnd = Array.from(
    { length: Math.min(boundary, total) },
    (_, i) => total - boundary + i + 1
  ).filter((p) => p > 0);

  const siblingStart = Math.max(current - sibling, 1);
  const siblingEnd = Math.min(current + sibling, total);
  const siblingRange = Array.from(
    { length: siblingEnd - siblingStart + 1 },
    (_, i) => siblingStart + i
  );

  const allPages = Array.from(
    new Set([...boundaryStart, ...siblingRange, ...boundaryEnd])
  )
    .sort((a, b) => a - b)
    .filter((p) => p >= 1 && p <= total);

  const result: PageItem[] = [];
  for (let i = 0; i < allPages.length; i++) {
    if (i > 0 && allPages[i] - allPages[i - 1] > 1) {
      result.push(
        allPages[i - 1] < current ? "ellipsis-start" : "ellipsis-end"
      );
    }
    result.push(allPages[i]);
  }
  return result;
}

function buildCompactPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  return buildPageItems({ current, total, boundary: 1, sibling: 1 });
}

// ─────────────────────────────────────────────
// 아이콘
// ─────────────────────────────────────────────

function ChevronLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 4L6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 공통 페이지 버튼
// ─────────────────────────────────────────────

function PageButton({
  page,
  isActive,
  disabled,
  onClick,
}: {
  page: number;
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${page}페이지`}
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px]",
        "transition-colors duration-100 outline-none",
        "focus-visible:outline-primary-normal focus-visible:outline-2 focus-visible:outline-offset-[1px]",
        "disabled:pointer-events-none disabled:opacity-40",
        isActive
          ? "text-label-strong text-body-2-normal-medium bg-[rgba(var(--semantic-label-normal-rgb),0.09)]"
          : "text-label-neutral hover:bg-fill-normal text-body-2-normal-regular"
      )}
    >
      {page}
    </button>
  );
}

// ─────────────────────────────────────────────
// 이전/다음 버튼
// ─────────────────────────────────────────────

function NavButton({
  direction,
  disabled,
  onClick,
  ariaLabel,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center rounded-full",
        "text-label-alternative outline-none",
        "focus-visible:outline-primary-normal focus-visible:outline-2 focus-visible:outline-offset-[1px]",
        "disabled:pointer-events-none disabled:opacity-40"
      )}
    >
      {direction === "prev" ? (
        <ChevronLeft size={16} />
      ) : (
        <ChevronRight size={16} />
      )}
      <div
        role="presentation"
        className={cn(
          "absolute top-1/2 left-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full",
          "bg-[var(--semantic-label-normal)]",
          "scale-0 opacity-0",
          "transition-[transform,opacity] duration-[120ms] ease-in",
          "group-hover:scale-100 group-hover:opacity-[0.08]"
        )}
        style={{ width: "calc(100% + 16px)", height: "calc(100% + 16px)" }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────
// PaginationSelect
// ─────────────────────────────────────────────

export interface PaginationSelectProps {
  defaultPageSize?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  label?: string;
  disabled?: boolean;
  onChange?: (pageSize: number) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
}

export function PaginationSelect({
  defaultPageSize,
  pageSize,
  pageSizeOptions = [10, 20, 30, 40, 50],
  label = "씩 보기",
  disabled,
  onChange,
  open,
  onOpenChange,
  defaultOpen,
}: PaginationSelectProps) {
  const defaultVal = String(defaultPageSize ?? pageSizeOptions[0] ?? 10);
  const value = pageSize !== undefined ? String(pageSize) : undefined;

  return (
    <div className="inline-flex items-center gap-1.5">
      <SelectPrimitive.Root
        defaultValue={defaultVal}
        value={value}
        onValueChange={(v) => onChange?.(Number(v))}
        disabled={disabled}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <SelectPrimitive.Trigger
          className={cn(
            "border-line-normal-neutral inline-flex h-8 items-center gap-1 rounded-lg border pr-[6px] pl-2",
            "text-label-2-regular bg-background-normal text-label-normal",
            "hover:border-line-normal-strong transition-colors",
            "focus-visible:outline-primary-normal focus-visible:outline-2 focus-visible:outline-offset-[1px]",
            "disabled:pointer-events-none disabled:opacity-40",
            "cursor-pointer select-none"
          )}
          aria-label="페이지당 항목 수"
        >
          <SelectPrimitive.Value />
          <CaretDown width={16} height={16} />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className={cn(
              "border-line-solid-normal bg-background-normal z-50 min-w-[80px] overflow-hidden rounded-[6px] border shadow-md",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            <SelectPrimitive.Viewport className="p-1">
              {pageSizeOptions.map((opt) => (
                <SelectPrimitive.Item
                  key={opt}
                  value={String(opt)}
                  className={cn(
                    "text-body-2-normal-regular text-label-normal flex h-7 items-center rounded-md px-3",
                    "cursor-pointer outline-none select-none",
                    "transition-[font-weight,color] duration-150 will-change-[font-weight,color]",
                    "hover:bg-fill-normal",
                    "data-[state=checked]:text-label-2-bold data-[state=checked]:text-label-strong",
                    "focus:bg-fill-normal"
                  )}
                >
                  <SelectPrimitive.ItemText>{opt}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      <span className="text-label-2-medium text-label-alternative whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
PaginationSelect.displayName = "PaginationSelect";

// ─────────────────────────────────────────────
// PaginationField
// ─────────────────────────────────────────────

export interface PaginationFieldProps {
  label?: string;
  disabled?: boolean;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function PaginationField({
  label = "페이지 이동",
  disabled,
  totalPages = 1,
  onPageChange,
}: PaginationFieldProps) {
  const [inputVal, setInputVal] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const num = parseInt(inputVal, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        onPageChange?.(num);
        setInputVal("");
      }
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="number"
        min={1}
        max={totalPages}
        value={inputVal}
        disabled={disabled}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=""
        aria-label={label}
        className={cn(
          "text-label-2-regular text-label-normal border-line-solid-normal h-8 w-[53px] rounded-lg border px-2 text-center",
          "focus:border-primary-normal focus:ring-primary-normal outline-none focus:ring-1",
          "disabled:pointer-events-none disabled:opacity-40",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        )}
      />
      <span className="text-label-2-medium text-label-alternative whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
PaginationField.displayName = "PaginationField";

// ─────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────

export interface PaginationProps {
  variant?: PaginationVariant;
  defaultPage?: number;
  page?: number;
  totalPages?: number;
  boundaryPages?: number;
  siblingPages?: number;
  disabled?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  onChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Pagination({
  variant = "extended",
  defaultPage = 1,
  page: pageProp,
  totalPages = 1,
  boundaryPages = 1,
  siblingPages = 1,
  disabled = false,
  hidePrevButton,
  hideNextButton,
  leadingContent,
  trailingContent,
  onChange,
  className,
  style,
}: PaginationProps) {
  const [internalPage, setInternalPage] = React.useState(defaultPage);
  const current = pageProp ?? internalPage;

  const goTo = (p: number) => {
    const next = Math.max(1, Math.min(p, totalPages));
    if (next === current) return;
    if (pageProp === undefined) setInternalPage(next);
    onChange?.(next);
  };

  // ── minimize ───────────────────────────────
  if (variant === "minimize") {
    return (
      <nav
        aria-label="페이지 탐색"
        className={cn("inline-flex items-center gap-2", className)}
        style={style}
      >
        {!hidePrevButton && (
          <NavButton
            direction="prev"
            disabled={disabled || current <= 1}
            onClick={() => goTo(current - 1)}
            ariaLabel="이전 페이지"
          />
        )}

        <span className="text-label-2-medium text-label-neutral text-center">
          {current}/{totalPages}
        </span>

        {!hideNextButton && (
          <NavButton
            direction="next"
            disabled={disabled || current >= totalPages}
            onClick={() => goTo(current + 1)}
            ariaLabel="다음 페이지"
          />
        )}
      </nav>
    );
  }

  // ── page items ─────────────────────────────
  const items =
    variant === "compact"
      ? buildCompactPageItems(current, totalPages)
      : buildPageItems({
          current,
          total: totalPages,
          boundary: boundaryPages,
          sibling: siblingPages,
        });

  const pageButtons = (
    <div className="inline-flex items-center gap-1.5" role="list">
      {items.map((item, idx) =>
        typeof item === "number" ? (
          <PageButton
            key={item}
            page={item}
            isActive={item === current}
            disabled={disabled}
            onClick={() => goTo(item)}
          />
        ) : (
          <span
            key={`${item}-${idx}`}
            className="text-body-2-normal-regular text-label-alternative inline-flex h-7 w-7 items-center justify-center select-none"
            aria-hidden
          >
            …
          </span>
        )
      )}
    </div>
  );

  const prevBtn = !hidePrevButton && (
    <NavButton
      direction="prev"
      disabled={disabled || current <= 1}
      onClick={() => goTo(current - 1)}
      ariaLabel="이전 페이지"
    />
  );
  const nextBtn = !hideNextButton && (
    <NavButton
      direction="next"
      disabled={disabled || current >= totalPages}
      onClick={() => goTo(current + 1)}
      ariaLabel="다음 페이지"
    />
  );

  // ── compact ────────────────────────────────
  if (variant === "compact") {
    return (
      <nav
        aria-label="페이지 탐색"
        className={cn("inline-flex items-center gap-4", className)}
        style={style}
      >
        {prevBtn}
        {pageButtons}
        {nextBtn}
      </nav>
    );
  }

  // ── extended ───────────────────────────────
  const hasLeading = !!leadingContent;
  const hasTrailing = !!trailingContent;

  return (
    <nav
      aria-label="페이지 탐색"
      className={cn(
        "flex w-full items-center gap-3",
        hasLeading || hasTrailing ? "justify-between" : "justify-center",
        className
      )}
      style={style}
    >
      {/* leading */}
      {hasLeading && (
        <div className="flex shrink-0 items-center">
          {React.isValidElement(leadingContent) &&
          leadingContent.type === PaginationField
            ? React.cloneElement(
                leadingContent as React.ReactElement<PaginationFieldProps>,
                { totalPages, onPageChange: goTo }
              )
            : leadingContent}
        </div>
      )}

      {/* 페이지 버튼 */}
      <div className="flex items-center gap-4">
        {prevBtn}
        {pageButtons}
        {nextBtn}
      </div>

      {/* trailing */}
      {hasTrailing && (
        <div className="flex shrink-0 items-center">
          {React.isValidElement(trailingContent) &&
          trailingContent.type === PaginationField
            ? React.cloneElement(
                trailingContent as React.ReactElement<PaginationFieldProps>,
                { totalPages, onPageChange: goTo }
              )
            : trailingContent}
        </div>
      )}
    </nav>
  );
}
Pagination.displayName = "Pagination";
