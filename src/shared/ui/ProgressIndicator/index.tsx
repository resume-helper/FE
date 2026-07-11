"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/shared/lib/cn";

export type SxProp = React.CSSProperties;

export interface ProgressIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "value"
> {
  percent?: number;
  sx?: SxProp;
}

export function ProgressIndicator({
  percent = 0,
  sx,
  className,
  ...props
}: ProgressIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <ProgressPrimitive.Root
      value={clamped}
      max={100}
      aria-label="진행률"
      aria-valuetext={`${clamped}%`}
      className={cn(
        "bg-fill-normal relative h-[2px] w-full overflow-hidden rounded-full",
        className
      )}
      style={sx}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="bg-primary-normal h-full rounded-full transition-[width] duration-300 ease-in-out"
        style={{ width: `${clamped}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
