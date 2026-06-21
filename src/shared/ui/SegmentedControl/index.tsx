import { useState, useRef, useCallback, useEffect, CSSProperties } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const containerVariants = cva("relative flex w-full items-center shrink-0", {
  variants: {
    size: {
      small: "h-8 rounded-lg",
      medium: "h-10 rounded-[10px]",
      large: "h-12 rounded-xl",
    },
    variant: {
      solid: "bg-fill-normal",
      outlined: "border border-line-normal-neutral",
    },
  },
  compoundVariants: [
    { variant: "solid", size: "small", className: "p-0.5" },
    { variant: "solid", size: "medium", className: "p-0.5" },
    { variant: "solid", size: "large", className: "p-[3px]" },
  ],
  defaultVariants: { size: "large", variant: "solid" },
});

const segmentVariants = cva(
  "relative flex h-full flex-1 items-center justify-center min-w-0 cursor-pointer select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-1",
  {
    variants: {
      size: {
        small: "text-label-2-medium",
        medium: "text-body-2-normal-medium",
        large: "text-headline-2-medium",
      },
      variant: {
        solid: "",
        outlined: "",
      },
      isActive: {
        true: "",
        false: "text-label-alternative",
      },
    },
    compoundVariants: [
      { variant: "solid", size: "small", className: "rounded-[6px]" },
      { variant: "solid", size: "medium", className: "rounded-lg" },
      { variant: "solid", size: "large", className: "rounded-[10px]" },
      { variant: "solid", isActive: true, className: "text-label-normal" },
      { variant: "outlined", isActive: true, className: "text-primary-normal" },
    ],
    defaultVariants: { size: "large", variant: "solid", isActive: false },
  }
);

export type SegmentedControlOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outlined";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  size = "large",
  variant = "solid",
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedControlProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? options[0]?.value ?? ""
  );

  const currentValue = isControlled ? value : internalValue;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumbStyle, setThumbStyle] = useState<CSSProperties>({});
  const isFirstRender = useRef(true);
  const currentValueRef = useRef(currentValue);
  useEffect(() => {
    currentValueRef.current = currentValue;
  });

  const updateThumb = useCallback(
    (activeValue: string, animate: boolean) => {
      if (variant !== "solid") return;

      const container = containerRef.current;
      const activeIndex = options.findIndex((o) => o.value === activeValue);
      const activeEl = itemRefs.current[activeIndex];

      if (!container || activeIndex === -1 || !activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setThumbStyle({
        left: activeRect.left - containerRect.left,
        top: activeRect.top - containerRect.top,
        width: activeRect.width,
        height: activeRect.height,
        borderRadius: window.getComputedStyle(activeEl).borderRadius,
        transitionProperty: animate ? "left, top, width, height" : "none",
        transitionDuration: animate ? "500ms" : "0ms",
        transitionTimingFunction: animate
          ? "cubic-bezier(0.25, 1.25, 0.4, 0.99)"
          : "none",
      });
    },
    [options, variant]
  );

  useEffect(() => {
    const animate = !isFirstRender.current;
    isFirstRender.current = false;
    updateThumb(currentValue, animate);
  }, [currentValue, updateThumb]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() =>
      updateThumb(currentValueRef.current, false)
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [updateThumb]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (!isControlled) setInternalValue(optionValue);
      onChange?.(optionValue);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (index + 1) % options.length;
        itemRefs.current[next]?.focus();
        handleSelect(options[next].value);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (index - 1 + options.length) % options.length;
        itemRefs.current[prev]?.focus();
        handleSelect(options[prev].value);
      }
    },
    [options, handleSelect]
  );

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(containerVariants({ size, variant }), className)}
    >
      {/* solid 전용 슬라이딩 thumb */}
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="bg-background-elevated-normal pointer-events-none absolute shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)]"
          style={thumbStyle}
        />
      )}

      {options.map((option, index) => {
        const isActive = option.value === currentValue;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        const nextIsActive = options[index + 1]?.value === currentValue;

        const outlinedCorner = {
          small: "rounded-lg",
          medium: "rounded-[10px]",
          large: "rounded-xl",
        }[size];

        const activeBorderRadius = cn(
          isFirst && isLast && outlinedCorner,
          isFirst && !isLast && `${outlinedCorner} rounded-r-none`,
          !isFirst && isLast && `${outlinedCorner} rounded-l-none`,
          !isFirst && !isLast && "rounded-none"
        );

        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(segmentVariants({ size, variant, isActive }))}
          >
            {/* outlined 전용 active 배경 + border */}
            {variant === "outlined" && isActive && (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    "bg-primary-normal pointer-events-none absolute inset-0 opacity-5",
                    activeBorderRadius
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "border-primary-normal pointer-events-none absolute inset-0 border opacity-[0.43]",
                    activeBorderRadius
                  )}
                />
              </>
            )}
            {/* outlined 세그먼트 사이 구분선 (마지막 제외) */}
            {variant === "outlined" &&
              !isActive &&
              !isLast &&
              !nextIsActive && (
                <span
                  aria-hidden="true"
                  className="bg-line-normal-neutral pointer-events-none absolute inset-y-px right-0 w-px"
                />
              )}

            <span className="relative z-10 flex min-w-0 items-center justify-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {option.icon && (
                <span className="flex shrink-0 items-center">
                  {option.icon}
                </span>
              )}
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                {option.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
