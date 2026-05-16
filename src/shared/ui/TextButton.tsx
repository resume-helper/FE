import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Spinner } from "@/shared/ui/Spinner";

const textButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1",
    "whitespace-nowrap cursor-pointer select-none",
    "transition-colors duration-150 ease-in-out",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "after:absolute after:inset-x-[-7px] after:inset-y-0 after:rounded-md",
    "after:opacity-0 after:transition-opacity after:duration-150 after:ease-in-out",
    "hover:after:opacity-[0.05] focus-visible:after:opacity-[0.08] active:after:opacity-[0.12]",
    "disabled:after:hidden",
    "data-[loading=true]:cursor-wait data-[loading=true]:after:hidden",
  ],
  {
    variants: {
      size: {
        medium: "py-1 text-body-1-normal-bold",
        small: "py-[3px] text-label-1-normal-bold",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const colorClassMap = {
  primary:
    "text-primary-normal after:bg-primary-normal disabled:text-label-disable",
  assistive:
    "text-label-alternative after:bg-label-normal disabled:text-label-disable",
} as const;

type TextButtonColor = keyof typeof colorClassMap;

type TextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof textButtonVariants> & {
    color?: TextButtonColor;
    loading?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
  };

function TextButton({
  color = "primary",
  size,
  loading = false,
  disabled,
  leadingIcon,
  trailingIcon,
  children,
  className,
  ...props
}: TextButtonProps) {
  const spinnerColor =
    color === "assistive" ? "text-label-alternative" : "text-primary-normal";
  const spinnerSize = size === "small" ? "sm" : "md";

  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled || loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        textButtonVariants({ size }),
        colorClassMap[color],
        className
      )}
    >
      {loading ? (
        <Spinner size={spinnerSize} className={spinnerColor} />
      ) : (
        <>
          {leadingIcon && (
            <span className="flex items-center py-0.5">{leadingIcon}</span>
          )}
          {children}
          {trailingIcon && (
            <span className="flex items-center py-0.5">{trailingIcon}</span>
          )}
        </>
      )}
    </button>
  );
}

export { TextButton, textButtonVariants };
export type { TextButtonProps };
