import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const textButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-1 font-semibold transition-colors disabled:pointer-events-none data-[loading]:pointer-events-none hover:cursor-pointer rounded-md",
  {
    variants: {
      color: {
        primary:
          "text-primary-normal hover:bg-primary-normal/5 focus-visible:bg-primary-normal/8 active:bg-primary-normal/12 disabled:text-label-disable",
        assistive:
          "text-label-alternative hover:bg-label-normal/4 focus-visible:bg-label-normal/6 active:bg-label-normal/9 disabled:text-label-disable",
      },
      size: {
        small: "px-1.5 py-1 text-[14px] leading-[1.429] tracking-[0.0145em]",
        medium: "px-1.5 py-1 text-[16px] leading-[1.5] tracking-[0.0057em]",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

const loaderSizeMap = { small: 16, medium: 18 };

interface TextButtonProps
  extends
    Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof textButtonVariants> {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function TextButton({
  color,
  size = "medium",
  loading,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  ...props
}: TextButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled || loading}
      data-loading={loading || undefined}
      className={cn(textButtonVariants({ color, size }), className)}
      {...props}
    >
      {loading ? (
        <LoaderCircle
          size={loaderSizeMap[size ?? "medium"]}
          className="animate-spin text-current"
          aria-label="Loading"
        />
      ) : (
        <>
          {leadingIcon}
          {children}
          {trailingIcon}
        </>
      )}
    </button>
  );
}

export { TextButton, textButtonVariants, type TextButtonProps };
