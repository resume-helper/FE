"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/shared/lib/cn";

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
function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 5l4 4 4-4"
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
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-medium",
        "transition-colors duration-100 outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-40",
        isActive
          ? "bg-[#1B1C1E] text-white"
          : "text-[#495057] hover:bg-[#F1F3F5]"
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
        "inline-flex h-8 w-8 items-center justify-center rounded-lg",
        "text-[#868E96] transition-colors duration-100 outline-none",
        "hover:bg-[#F1F3F5] hover:text-[#495057]",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-40"
      )}
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
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
          "inline-flex h-8 items-center gap-1 rounded-lg border border-[#DEE2E6] px-2",
          "bg-white text-[13px] text-[#495057]",
          "transition-colors hover:border-[#ADB5BD]",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-40",
          "cursor-pointer select-none"
        )}
        aria-label="페이지당 항목 수"
      >
        <SelectPrimitive.Value />
        <ChevronDown />
        <span className="text-[#868E96]">{label}</span>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[80px] overflow-hidden rounded-lg border border-[#DEE2E6] bg-white shadow-md",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {pageSizeOptions.map((opt) => (
              <SelectPrimitive.Item
                key={opt}
                value={String(opt)}
                className={cn(
                  "flex h-8 items-center rounded-md px-3 text-[13px] text-[#495057]",
                  "cursor-pointer outline-none select-none",
                  "hover:bg-[#F1F3F5]",
                  "data-[state=checked]:font-semibold data-[state=checked]:text-[#1B1C1E]",
                  "focus:bg-[#F1F3F5]"
                )}
              >
                <SelectPrimitive.ItemText>{opt}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
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
    <div className="inline-flex items-center gap-1.5">
      <input
        type="number"
        min={1}
        max={totalPages}
        value={inputVal}
        disabled={disabled}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="—"
        aria-label={label}
        className={cn(
          "h-8 w-12 rounded-lg border border-[#DEE2E6] px-2 text-center text-[13px] text-[#495057]",
          "outline-none focus:border-[#1B1C1E] focus:ring-1 focus:ring-[#1B1C1E]",
          "disabled:pointer-events-none disabled:opacity-40",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        )}
      />
      <span className="text-[13px] whitespace-nowrap text-[#868E96]">
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
        className={cn("inline-flex items-center gap-1", className)}
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
        <span className="min-w-[48px] px-2 text-center text-[13px] text-[#495057]">
          {current}
          <span className="text-[#ADB5BD]">/{totalPages}</span>
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
    <div className="inline-flex items-center gap-0.5" role="list">
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
            className="inline-flex h-8 w-8 items-center justify-center text-[13px] text-[#ADB5BD] select-none"
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
        className={cn("inline-flex items-center gap-1", className)}
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
      <div className="flex items-center gap-1">
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
