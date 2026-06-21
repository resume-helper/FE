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
      contentBadge: "inline-flex items-center",
      iconButton: "inline-flex items-center justify-center",
      button: "text-body-1-normal-bold text-primary-normal cursor-pointer",
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
  "absolute inset-0 rounded-xl pointer-events-none border transition-colors duration-150",
  {
    variants: {
      status: {
        default: "border-line-normal-neutral",
        invalid: "border-status-negative/[0.28]",
      },
      focused: {
        true: "border-2 border-primary-normal/[0.43]",
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
        status: "invalid",
        focused: true,
        className: "border-2 border-status-negative/[0.28]",
      },
    ],
    defaultVariants: {
      status: "default",
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
  required?: boolean;
  description?: React.ReactNode;

  status?: "default" | "invalid";

  /** 내용에 따라 자동 확장(auto) vs 고정 높이(none) */
  resize?: "auto" | "none";
  /** resize="auto" 일 때 최소 줄 수 */
  minRows?: number;
  /** resize="auto" 일 때 최대 줄 수 (이후 내부 스크롤) */
  maxRows?: number;
  /** resize="none" 일 때 고정 줄 수 */
  rows?: number;

  /**
   * 지정 시 bottom bar 좌측에 "현재글자수/maxLength" charCount를 자동 표시.
   * leadingContent를 직접 넘기면 override됨.
   */
  maxLength?: number;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;

  className?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      required,
      description,
      status = "default",
      resize = "auto",
      minRows = 3,
      maxRows,
      rows = 3,
      maxLength,
      leadingContent,
      trailingContent,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      className,
      id: idProp,
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

    // auto resize를 위한 내부 ref
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [focused, setFocused] = useState(false);

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    // 줄 높이 계산 후 height 적용
    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el || resize !== "auto") return;

      el.style.height = "auto";
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
      const paddingY =
        parseFloat(getComputedStyle(el).paddingTop) +
        parseFloat(getComputedStyle(el).paddingBottom);

      const minH = lineHeight * minRows + paddingY;
      const maxH = maxRows ? lineHeight * maxRows + paddingY : Infinity;
      const desired = Math.min(Math.max(el.scrollHeight, minH), maxH);

      el.style.height = `${desired}px`;
      el.style.overflowY = el.scrollHeight > desired ? "auto" : "hidden";
    }, [resize, minRows, maxRows]);

    useEffect(() => {
      adjustHeight();
    }, [currentValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    // charCount 자동 처리
    const charCount =
      maxLength != null
        ? typeof currentValue === "string"
          ? currentValue.length
          : 0
        : null;
    const resolvedLeadingContent =
      leadingContent !== undefined ? (
        leadingContent
      ) : charCount != null ? (
        <TextAreaContent variant="characterCounter">
          {charCount}/{maxLength}
        </TextAreaContent>
      ) : null;

    const showBottom =
      resolvedLeadingContent != null || trailingContent != null;

    // resize="none" 일 때 min-height로 고정 줄 수 표현 (CSS rows 대체)
    const fixedStyle =
      resize === "none"
        ? ({ "--ta-rows": rows } as React.CSSProperties)
        : undefined;

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {/* 레이블 */}
        {label != null && (
          <label
            htmlFor={id}
            className="text-label-1-normal-bold text-label-neutral flex items-center gap-0.5"
          >
            {label}
            {required && (
              <span className="text-status-negative" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* 입력 래퍼 */}
        <div className="relative w-full">
          {/* 배경 레이어 (glassmorphism) */}
          <div className="bg-background-elevated-1 absolute inset-0 rounded-xl backdrop-blur-[32px]" />

          {/* 입력 박스 */}
          <div className="relative flex flex-col gap-3 overflow-clip rounded-xl p-3">
            <textarea
              {...props}
              ref={setRef}
              id={id}
              value={isControlled ? value : internalValue}
              defaultValue={isControlled ? undefined : undefined}
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
              maxLength={maxLength}
              style={{
                ...fixedStyle,
                ...(resize === "none"
                  ? {
                      minHeight: `calc(var(--ta-rows, 3) * 1.625em + 0px)`,
                      resize: "none",
                      overflowY: "auto",
                    }
                  : { resize: "none", overflowY: "hidden" }),
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
              status === "invalid"
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
