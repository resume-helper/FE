import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

// ─── TextAreaContent ──────────────────────────────────────────────────────────

const textAreaContentVariants = cva("", {
  variants: {
    variant: {
      characterCounter: "text-label-2-medium text-label-alternative",
      badge: "inline-flex items-center",
      chip: "inline-flex items-center",
      icon: "inline-flex size-6 items-center justify-center text-[24px]",
      iconButton: "inline-flex items-center justify-center",
      primaryIconButton: "inline-flex items-center justify-center",
      textButton: "text-body-1-normal-bold text-primary-normal cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "characterCounter",
  },
});

type TextAreaContentProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof textAreaContentVariants>;

function TextAreaContent({
  variant,
  className,
  children,
  ...props
}: TextAreaContentProps) {
  return (
    <span
      {...props}
      className={cn(textAreaContentVariants({ variant }), className)}
    >
      {children}
    </span>
  );
}

// ─── interaction layer CVA ────────────────────────────────────────────────────

const interactionVariants = cva(
  "absolute inset-0 rounded-xl pointer-events-none border transition-[border-color,border-width] duration-150 ease-out",
  {
    variants: {
      status: {
        normal:
          "border-line-normal-neutral group-hover:border-primary-normal/[0.43] group-hover:border-2 group-active:border-primary-normal/[0.43] group-active:border-2",
        negative:
          "border-status-negative/[0.28]! group-hover:border-2 group-active:border-2",
      },
      focused: {
        true: "border-2 border-primary-normal/[0.43]!",
        false: "",
      },
      disabled: {
        true: "opacity-0",
        false: "",
      },
    },
    compoundVariants: [
      // invalid 포커스 시에도 invalid 테두리 유지
      {
        status: "negative",
        focused: true,
        className: "border-2 border-status-negative/[0.28]!",
      },
    ],
    defaultVariants: {
      status: "normal",
      focused: false,
      disabled: false,
    },
  }
);

// ─── TextArea ─────────────────────────────────────────────────────────────────

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows"
> & {
  label?: React.ReactNode;
  heading?: boolean;
  requiredBadge?: boolean;
  description?: React.ReactNode;
  bottom?: boolean;

  status?: "normal" | "negative";

  resize?: "normal" | "limit" | "fixed";
  /** normal/limit 모드의 최소 줄 수 */
  minRows?: number;
  /** limit 모드의 최대 줄 수 */
  maxRows?: number;
  /** fixed 모드의 줄 수 */
  rows?: number;

  /**
   * 지정 시 bottom bar 좌측에 "현재글자수/maxLength" charCount를 자동 표시.
   * leadingContent를 직접 넘기면 override됨.
   */
  maxLength?: number;
  /** maxLength 초과 입력 허용 여부 */
  overflow?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;

  className?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      heading = true,
      requiredBadge,
      description,
      bottom = true,
      status = "normal",
      resize = "normal",
      minRows = 3,
      maxRows = 8,
      rows = 3,
      maxLength,
      overflow = true,
      leadingContent,
      trailingContent,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      className,
      id: idProp,
      style,
      ...props
    },
    ref
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;

    // 제어/비제어 판단
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? value : internalValue;

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [focused, setFocused] = useState(false);

    const combinedRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el || resize === "fixed") return;

      el.style.height = "auto";
      const rowHeight = parseFloat(getComputedStyle(el).lineHeight) || 26;
      const minHeight = rowHeight * minRows;
      const maxHeight = resize === "limit" ? rowHeight * maxRows : Infinity;
      const height = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);

      el.style.height = `${height}px`;
      el.style.overflowY = el.scrollHeight > height ? "auto" : "hidden";
    }, [resize, minRows, maxRows]);

    useEffect(() => {
      adjustHeight();
    }, [currentValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const charCount =
      maxLength != null
        ? typeof currentValue === "string"
          ? currentValue.length
          : 0
        : null;
    const isOverflowing =
      charCount != null && maxLength != null && charCount > maxLength;
    const resolvedLeadingContent =
      leadingContent !== undefined ? (
        leadingContent
      ) : charCount != null ? (
        <TextAreaContent
          variant="characterCounter"
          className={isOverflowing ? "text-status-negative" : undefined}
        >
          {charCount}/{maxLength}
        </TextAreaContent>
      ) : null;

    const showBottom =
      bottom && (resolvedLeadingContent != null || trailingContent != null);

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {/* 레이블 */}
        {heading && label != null && (
          <label
            htmlFor={id}
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

        {/* 입력 래퍼 */}
        <div className="group relative w-full">
          {/* 배경 레이어 (glassmorphism) */}
          <div
            className={cn(
              "absolute inset-0 rounded-xl backdrop-blur-[32px]",
              disabled ? "bg-fill-alternative" : "bg-background-elevated-1"
            )}
          />

          {/* 입력 박스 */}
          <div
            className={cn(
              "relative flex flex-col gap-3 overflow-clip rounded-xl p-3",
              disabled && "opacity-[0.36]"
            )}
          >
            <textarea
              {...props}
              ref={combinedRef}
              id={id}
              value={isControlled ? value : internalValue}
              onChange={handleChange}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
              disabled={disabled}
              readOnly={readOnly}
              rows={resize === "fixed" ? rows : undefined}
              maxLength={overflow ? undefined : maxLength}
              aria-invalid={status === "negative" || undefined}
              style={{
                resize: "none",
                overflowY: resize === "fixed" ? "auto" : "hidden",
                ...style,
              }}
              className={cn(
                "w-full bg-transparent outline-none",
                "text-body-1-reading-regular text-label-normal",
                "placeholder:text-label-assistive",
                "disabled:text-label-assistive disabled:cursor-not-allowed",
                "read-only:cursor-default",
                "px-1 py-0"
              )}
            />

            {/* bottom bar */}
            {showBottom && (
              <div className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-1">
                  {resolvedLeadingContent}
                </div>
                {trailingContent != null && (
                  <div className="flex shrink-0 items-center gap-1">
                    {trailingContent}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* border / interaction 레이어 */}
          <div
            className={interactionVariants({
              status,
              focused,
              disabled: !!disabled,
            })}
          />
        </div>

        {/* description / 에러 메시지 */}
        {description != null && (
          <p
            className={cn(
              "text-caption-1-regular",
              status === "negative"
                ? "text-status-negative"
                : "text-label-alternative"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

export { TextArea, TextAreaContent };
export type { TextAreaProps, TextAreaContentProps };
