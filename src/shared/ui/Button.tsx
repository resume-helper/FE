import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Spinner } from "@/shared/ui/Spinner";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center overflow-hidden",
    "font-semibold whitespace-nowrap cursor-pointer select-none",
    "transition-colors duration-150 ease-in-out",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-label-normal after:opacity-0 after:transition-opacity after:duration-150 after:ease-in-out",
    "hover:after:opacity-[0.05] active:after:opacity-[0.12]",
    "disabled:after:hidden",
    "data-[loading=true]:cursor-wait data-[loading=true]:after:hidden",
  ],
  {
    variants: {
      variant: {
        solid: "",
        outlined: "border border-line-normal-neutral",
      },
      color: {
        primary: "",
        assistive: "",
      },
      size: {
        large: "px-7 py-3 rounded-xl gap-1.5 text-body-1-normal",
        medium: "px-5 py-[9px] rounded-[10px] gap-[5px] text-body-2-normal",
        small: "px-3.5 py-[7px] rounded-lg gap-1 text-label-2",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // solid + primary
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary-normal text-static-white disabled:bg-interaction-disable disabled:text-label-assistive",
      },
      // outlined + primary
      {
        variant: "outlined",
        color: "primary",
        className:
          "bg-transparent text-primary-normal disabled:bg-transparent disabled:text-label-assistive disabled:border-line-normal-neutral",
      },
      // solid + assistive
      {
        variant: "solid",
        color: "assistive",
        className:
          "bg-fill-normal text-label-neutral disabled:bg-interaction-disable disabled:text-label-assistive",
      },
      // outlined + assistive
      {
        variant: "outlined",
        color: "assistive",
        className:
          "bg-transparent text-label-neutral border-line-normal-neutral disabled:bg-transparent disabled:text-label-assistive disabled:border-line-normal-neutral",
      },
      // iconOnly size override
      {
        size: "large",
        iconOnly: true,
        className: "px-3 py-3",
      },
      {
        size: "medium",
        iconOnly: true,
        className: "px-2.5 py-2.5",
      },
      {
        size: "small",
        iconOnly: true,
        className: "px-[7px] py-[7px]",
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    label?: string;
  };

const spinnerColorMap: Record<string, Record<string, string>> = {
  solid: {
    primary: "text-static-white",
    assistive: "text-label-assistive",
  },
  outlined: {
    primary: "text-primary-normal",
    assistive: "text-label-assistive",
  },
};

function Button({
  variant,
  color,
  size,
  iconOnly,
  loading = false,
  disabled,
  leadingIcon,
  trailingIcon,
  label,
  children,
  className,
  ...props
}: ButtonProps) {
  const spinnerColor =
    spinnerColorMap[variant ?? "solid"]?.[color ?? "primary"] ??
    "text-static-white";

  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled || loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ variant, color, size, iconOnly }),
        className
      )}
    >
      {loading ? (
        <Spinner
          size={size === "medium" ? "md" : size === "small" ? "sm" : "lg"}
          className={spinnerColor}
        />
      ) : (
        <>
          {leadingIcon}
          {iconOnly ? (
            <>
              {children}
              {label && <span className="sr-only">{label}</span>}
            </>
          ) : (
            children
          )}
          {trailingIcon}
        </>
      )}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
