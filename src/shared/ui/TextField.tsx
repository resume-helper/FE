import { forwardRef, useId, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { CircleCloseFill } from "@/shared/icons";
import { IconButton } from "@/shared/ui/IconButton";

// ─── TextFieldContent ─────────────────────────────────────────────────────────

const textFieldContentVariants = cva("", {
  variants: {
    variant: {
      icon: "inline-flex items-center justify-center size-6 text-[24px]",
      trailingButtonNormal:
        "text-body-1-normal-bold text-primary-normal whitespace-nowrap",
      trailingButtonAssistive:
        "text-body-1-normal-medium text-label-normal whitespace-nowrap",
    },
  },
  defaultVariants: {
    variant: "icon",
  },
});

type TextFieldContentProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof textFieldContentVariants>;

function TextFieldContent({
  variant,
  className,
  children,
  ...props
}: TextFieldContentProps) {
  return (
    <span
      {...props}
      className={cn(textFieldContentVariants({ variant }), className)}
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

// ─── TextField ────────────────────────────────────────────────────────────────

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;

  status?: "default" | "invalid";

  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;

  /** 값이 있을 때 X 버튼으로 전체 삭제. 기본값 true */
  clearable?: boolean;
  onClear?: () => void;

  /**
   * 입력창 우측에 분리된 버튼 영역.
   * TextFieldContent variant="trailingButtonNormal" | "trailingButtonAssistive" 로 감싸서 사용.
   */
  trailingButton?: React.ReactNode;
  trailingButtonDisabled?: boolean;
  onTrailingButtonClick?: React.MouseEventHandler<HTMLButtonElement>;

  className?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      required,
      description,
      status = "default",
      clearable = true,
      onClear,
      leadingContent,
      trailingContent,
      trailingButton,
      trailingButtonDisabled,
      onTrailingButtonClick,
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

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = isControlled ? value : internalValue;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onClear?.();
      // 네이티브 change 이벤트로 onChange에도 빈 값 전달
      const input = inputRef.current;
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(input, "");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }
    };

    const showClear =
      clearable && !disabled && !readOnly && Boolean(currentValue);

    const hasTrailingButton = trailingButton != null;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Enter" &&
        hasTrailingButton &&
        !trailingButtonDisabled &&
        !disabled
      ) {
        onTrailingButtonClick?.(
          e as unknown as React.MouseEvent<HTMLButtonElement>
        );
      }
      props.onKeyDown?.(e);
    };

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
        <div className="relative flex w-full">
          {/* ── 입력 영역 ── */}
          <div
            className={cn(
              "relative min-w-0 flex-1",
              hasTrailingButton && "flex-1"
            )}
          >
            {/* 배경 레이어 */}
            <div
              className={cn(
                "bg-background-elevated-1 absolute inset-0 backdrop-blur-[32px]",
                hasTrailingButton ? "rounded-l-xl" : "rounded-xl"
              )}
            />

            {/* 입력 박스 */}
            <div
              className={cn(
                "relative flex items-center gap-3 px-3 py-3",
                hasTrailingButton ? "rounded-l-xl" : "rounded-xl"
              )}
            >
              {/* leadingContent */}
              {leadingContent != null && (
                <div className="flex shrink-0 items-center">
                  {leadingContent}
                </div>
              )}

              {/* input */}
              <input
                {...props}
                ref={setRef}
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
                onKeyDown={handleKeyDown}
                disabled={disabled}
                readOnly={readOnly}
                className={cn(
                  "min-w-0 flex-1 bg-transparent outline-none",
                  "text-body-1-normal-regular text-label-normal",
                  "placeholder:text-label-assistive",
                  "disabled:text-label-assistive disabled:cursor-not-allowed",
                  "read-only:cursor-default",
                  "px-1"
                )}
              />

              {/* clear 버튼 */}
              {showClear && (
                <IconButton
                  label="입력 내용 지우기"
                  variant="normal"
                  onClick={handleClear}
                  className="text-label-assistive shrink-0"
                >
                  <CircleCloseFill />
                </IconButton>
              )}

              {/* trailingContent */}
              {trailingContent != null && (
                <div className="flex shrink-0 items-center">
                  {trailingContent}
                </div>
              )}
            </div>

            {/* border / interaction 레이어 */}
            <div
              className={cn(
                interactionVariants({
                  status,
                  focused,
                  disabled: !!disabled,
                }),
                hasTrailingButton && "rounded-r-none border-r-0"
              )}
            />
          </div>

          {/* ── trailingButton 영역 ── */}
          {hasTrailingButton && (
            <button
              type="button"
              disabled={trailingButtonDisabled || disabled}
              onClick={onTrailingButtonClick}
              className={cn(
                "relative flex shrink-0 items-center justify-center px-4 py-3",
                "min-w-20 rounded-r-xl",
                "disabled:cursor-not-allowed",
                // 배경
                trailingButtonDisabled || disabled
                  ? "bg-interaction-disable"
                  : "bg-background-elevated-1 backdrop-blur-[32px]",
                // 호버/액티브 오버레이
                "overflow-hidden",
                "after:bg-label-normal after:absolute after:inset-0",
                "after:opacity-0 after:transition-opacity after:duration-150",
                "hover:after:opacity-[0.05] active:after:opacity-[0.12]",
                "disabled:after:hidden"
              )}
            >
              {/* border */}
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-r-xl border",
                  status === "invalid"
                    ? "border-status-negative/[0.28]"
                    : "border-line-normal-neutral"
                )}
                aria-hidden="true"
              />
              <span className="relative">{trailingButton}</span>
            </button>
          )}
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

export { TextField, TextFieldContent };
export type { TextFieldProps, TextFieldContentProps };
