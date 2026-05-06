import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-1.5 font-semibold transition-colors disabled:pointer-events-none data-[loading]:pointer-events-none hover:cursor-pointer",
  {
    variants: {
      variant: {
        solid: "",
        outlined: "border border-line-normal-neutral bg-transparent",
      },
      color: {
        primary: "",
        assistive: "",
      },
      size: {
        small:
          "rounded-lg px-3.5 py-[7px] text-[13px] leading-[1.385] tracking-[0.0149em]",
        medium:
          "rounded-[10px] px-5 py-[9px] text-[15px] leading-[1.467] tracking-[0.0064em]",
        large:
          "rounded-xl px-7 py-3 text-[16px] leading-[1.5] tracking-[0.0036em]",
      },
      iconOnly: {
        true: "gap-0",
        false: "",
      },
    },
    compoundVariants: [
      // solid + primary
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary-normal text-static-white hover:bg-primary-strong focus-visible:bg-primary-strong active:bg-primary-heavy disabled:bg-interaction-disable disabled:text-label-assistive",
      },
      // solid + assistive
      {
        variant: "solid",
        color: "assistive",
        className:
          "bg-fill-normal text-label-neutral hover:bg-fill-alternative focus-visible:bg-fill-strong active:bg-fill-strong disabled:bg-interaction-disable disabled:text-label-assistive",
      },
      // outlined + primary
      {
        variant: "outlined",
        color: "primary",
        className:
          "text-primary-normal hover:bg-primary-normal/5 focus-visible:bg-primary-normal/8 active:bg-primary-normal/12 disabled:border-line-normal-neutral disabled:bg-transparent disabled:text-label-assistive",
      },
      // outlined + assistive
      {
        variant: "outlined",
        color: "assistive",
        className:
          "text-label-normal hover:bg-fill-alternative focus-visible:bg-fill-normal active:bg-fill-strong disabled:border-line-normal-neutral disabled:bg-transparent disabled:text-label-assistive",
      },
      // iconOnly size
      {
        iconOnly: true,
        size: "small",
        className: "p-[7px]",
      },
      {
        iconOnly: true,
        size: "medium",
        className: "p-[10px]",
      },
      {
        iconOnly: true,
        size: "large",
        className: "p-3",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "large",
      iconOnly: false,
    },
  }
);

const loaderSizeMap = {
  small: 18,
  medium: 20,
  large: 24,
};

interface ButtonProps
  extends
    Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function Button({
  variant,
  color,
  size = "large",
  iconOnly,
  loading,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled || loading}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ variant, color, size, iconOnly }),
        className
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle
          size={loaderSizeMap[size ?? "large"]}
          className={cn(
            "animate-spin",
            color === "assistive" ? "text-label-assistive" : "text-current"
          )}
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

export { Button, buttonVariants, type ButtonProps };
