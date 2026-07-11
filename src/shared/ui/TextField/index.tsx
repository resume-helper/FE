import { forwardRef, useCallback, useId, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { CircleCloseFill, CircleExclamationFill } from "@/shared/icons";
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

const TextFieldContent = ({
  variant,
  className,
  children,
  ...props
}: TextFieldContentProps) => {
  return (
    <span
      {...props}
      className={cn(textFieldContentVariants({ variant }), className)}
    >
      {children}
    </span>
  );
};

// ─── interaction layer CVA ────────────────────────────────────────────────────

const interactionVariants = cva(
  "absolute inset-0 rounded-xl pointer-events-none border transition-[border-color,border-width] duration-150 ease-out",
  {
    variants: {
      status: {
        default:
          "border-line-normal-neutral group-hover:border-primary-normal/[0.43] group-hover:border-2 group-active:border-primary-normal/[0.43] group-active:border-2",
        invalid:
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
      {
        status: "invalid",
        focused: true,
        className: "border-2 border-status-negative/[0.28]!",
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
    const combinedRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onClear?.();
      inputRef.current?.focus();
    };

    const showClear =
      clearable && !disabled && !readOnly && Boolean(currentValue);

    const hasTrailingButton = trailingButton != null;
    const resolvedTrailingContent =
      trailingContent ??
      (status === "invalid" ? (
        <TextFieldContent
          variant="icon"
          className="text-status-negative"
          aria-hidden="true"
        >
          <CircleExclamationFill />
        </TextFieldContent>
      ) : null);

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
              "group relative min-w-0 flex-1",
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
                  className={cn(
                    "text-label-assistive shrink-0 transition-colors duration-300 ease-in-out",
                    "hover:text-label-alternative focus-visible:text-label-alternative active:text-label-normal after:hidden"
                  )}
                >
                  <CircleCloseFill />
                </IconButton>
              )}

              {/* trailingContent */}
              {resolvedTrailingContent != null && (
                <div className="flex shrink-0 items-center">
                  {resolvedTrailingContent}
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
                "group relative flex shrink-0 items-center justify-center px-4 py-3",
                "min-w-20 rounded-r-xl",
                "disabled:cursor-not-allowed",
                trailingButtonDisabled || disabled
                  ? "bg-interaction-disable"
                  : "bg-background-elevated-1 backdrop-blur-[32px]",
                "overflow-hidden",
                "after:bg-label-normal after:absolute after:inset-0",
                "after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out",
                "hover:after:opacity-[0.05] active:after:opacity-[0.12]",
                "disabled:after:hidden"
              )}
            >
              {/* border */}
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-r-xl border transition-[border-color,border-width] duration-150 ease-out",
                  status === "invalid"
                    ? "border-status-negative/[0.28]! group-hover:border-2 group-active:border-2"
                    : "border-line-normal-neutral group-hover:border-primary-normal/[0.43] group-active:border-primary-normal/[0.43] group-hover:border-2 group-active:border-2"
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
