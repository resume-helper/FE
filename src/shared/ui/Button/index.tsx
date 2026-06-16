import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Spinner } from "@/shared/ui/Spinner";
import type { PolymorphicComponentWithRef } from "@/shared/types/polymorphic";

const buttonVariants = cva(
  [
    "relative isolate inline-flex items-center justify-center overflow-hidden",
    "whitespace-nowrap cursor-pointer select-none",
    "transition-[background-color,opacity] duration-300 ease-in-out",
    "after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out",
    "disabled:cursor-not-allowed disabled:after:opacity-0",
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
        large: "px-7 py-3 rounded-xl gap-1.5 text-body-1-normal-bold",
        medium:
          "px-5 py-[9px] rounded-[10px] gap-[5px] text-body-2-normal-bold",
        small: "px-3.5 py-[7px] rounded-lg gap-1 text-label-2-bold",
      },
      iconOnly: {
        true: "",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // solid + primary
      {
        variant: "solid",
        color: "primary",
        className:
          "bg-primary-normal text-static-white disabled:bg-interaction-disable disabled:text-label-assistive " +
          "after:bg-label-normal hover:after:opacity-[0.16] active:after:opacity-[0.28]",
      },
      // outlined + primary
      {
        variant: "outlined",
        color: "primary",
        className:
          "bg-transparent text-primary-normal disabled:bg-transparent disabled:text-label-assistive disabled:border-line-normal-neutral " +
          "after:bg-label-normal hover:after:opacity-[0.08] active:after:opacity-[0.16]",
      },
      // solid + assistive
      {
        variant: "solid",
        color: "assistive",
        className:
          "bg-fill-normal text-label-neutral disabled:bg-interaction-disable disabled:text-label-assistive " +
          "after:bg-label-normal hover:after:opacity-[0.08] active:after:opacity-[0.16]",
      },
      // outlined + assistive
      {
        variant: "outlined",
        color: "assistive",
        className:
          "bg-transparent text-label-neutral border-line-normal-neutral disabled:bg-transparent disabled:text-label-assistive disabled:border-line-normal-neutral " +
          "after:bg-label-normal hover:after:opacity-[0.06] active:after:opacity-[0.12]",
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
      fullWidth: false,
    },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  label?: string;
};

type ButtonProps<T extends React.ElementType = "button"> =
  PolymorphicComponentWithRef<T, ButtonOwnProps>;

type ButtonComponent = <T extends React.ElementType = "button">(
  props: ButtonProps<T>
) => React.ReactElement | null;

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

const Button: ButtonComponent = ({
  as,
  variant,
  color,
  size,
  iconOnly,
  fullWidth,
  loading = false,
  disabled,
  leadingIcon,
  trailingIcon,
  label,
  children,
  className,
  ref,
  ...props
}) => {
  const Component = as ?? "button";

  const spinnerColor =
    spinnerColorMap[variant ?? "solid"]?.[color ?? "primary"] ??
    "text-static-white";

  return (
    <Component
      {...props}
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled || loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ variant, color, size, iconOnly, fullWidth }),
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
    </Component>
  );
};

export { Button, buttonVariants };
export type { ButtonProps };
