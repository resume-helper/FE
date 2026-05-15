"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/shared/lib/cn";

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────

export type ProgressIndicatorSize = "small" | "medium" | "large";
export type ProgressIndicatorState =
  | "default"
  | "paused"
  | "error"
  | "indeterminate";

// ─────────────────────────────────────────────
// 사이즈 토큰
// ─────────────────────────────────────────────

const SIZE_HEIGHT: Record<ProgressIndicatorSize, string> = {
  small: "h-[2px]",
  medium: "h-1", // 4px
  large: "h-1.5", // 6px
};

// ─────────────────────────────────────────────
// 상태별 indicator 색상
// ─────────────────────────────────────────────

const STATE_COLOR: Record<ProgressIndicatorState, string> = {
  default: "#1B1C1E",
  paused: "#ADB5BD",
  error: "#E03131",
  indeterminate: "#1B1C1E",
};

const TRACK_COLOR = "#F1F3F5";

// ─────────────────────────────────────────────
// ProgressIndicator
// ─────────────────────────────────────────────

export interface ProgressIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "value"
> {
  percent?: number;
  size?: ProgressIndicatorSize;
  state?: ProgressIndicatorState;
}

export const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressIndicatorProps
>(
  (
    {
      percent = 0,
      size = "small",
      state = "default",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = state === "indeterminate";
    const clampedPercent = Math.min(100, Math.max(0, percent));

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={isIndeterminate ? undefined : clampedPercent}
        max={100}
        aria-label="진행률"
        aria-valuetext={isIndeterminate ? "로딩 중" : `${clampedPercent}%`}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          SIZE_HEIGHT[size],
          className
        )}
        style={{ backgroundColor: TRACK_COLOR, ...style }}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-in-out",
            isIndeterminate && "progress-indeterminate absolute left-0 w-1/3"
          )}
          style={{
            backgroundColor: STATE_COLOR[state],
            ...(!isIndeterminate && {
              width: `${clampedPercent}%`,
            }),
          }}
        />
      </ProgressPrimitive.Root>
    );
  }
);
ProgressIndicator.displayName = "ProgressIndicator";
