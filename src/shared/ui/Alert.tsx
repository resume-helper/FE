import React from "react";
import { AlertDialog } from "radix-ui";
import { cn } from "@/shared/lib/cn";
import { TextButton, type TextButtonProps } from "@/shared/ui/TextButton";

function Alert({ ...props }: React.ComponentProps<typeof AlertDialog.Root>) {
  return <AlertDialog.Root {...props} />;
}

function AlertTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialog.Trigger>) {
  return <AlertDialog.Trigger {...props} />;
}

function AlertContainer({
  children,
  ...props
}: React.ComponentProps<typeof AlertDialog.Portal>) {
  return (
    <AlertDialog.Portal {...props}>
      <AlertDialog.Overlay className="data-[state=open]:animate-popup-overlay-in data-[state=closed]:animate-popup-overlay-out fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center">
        {children}
      </div>
    </AlertDialog.Portal>
  );
}

type AlertContentProps = React.ComponentProps<typeof AlertDialog.Content> & {
  heading?: boolean;
};

function AlertContent({
  heading = true,
  className,
  children,
  ...props
}: AlertContentProps) {
  return (
    <AlertDialog.Content
      {...props}
      className={cn(
        "bg-background-elevated-normal relative z-50 flex w-[calc(100vw-40px)] max-w-100 min-w-[320px] flex-col gap-4 rounded-xl p-5",
        "data-[state=open]:animate-popup-content-in data-[state=closed]:animate-popup-content-out",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AlertHeading) {
          return React.cloneElement(
            child as React.ReactElement<AlertHeadingProps>,
            {
              "aria-hidden": !heading || undefined,
              className: cn(
                !heading && "sr-only",
                (child.props as AlertHeadingProps).className
              ),
            }
          );
        }
        return child;
      })}
    </AlertDialog.Content>
  );
}

type AlertHeadingProps = React.ComponentProps<typeof AlertDialog.Title>;

function AlertHeading({ className, ...props }: AlertHeadingProps) {
  return (
    <AlertDialog.Title
      {...props}
      className={cn("text-label-normal text-headline-1-bold", className)}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialog.Description>) {
  return (
    <AlertDialog.Description
      {...props}
      className={cn(
        "text-label-alternative text-body-2-normal-regular",
        className
      )}
    />
  );
}

function AlertActionArea({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("flex items-center justify-end gap-6", className)}
    />
  );
}

type AlertActionAreaButtonVariant = "normal" | "assistive" | "negative";

type AlertActionAreaButtonProps = Omit<TextButtonProps, "color"> & {
  variant?: AlertActionAreaButtonVariant;
};

const negativeClassName =
  "text-status-negative after:bg-status-negative disabled:text-label-disable";

function AlertActionAreaButton({
  variant = "normal",
  className,
  ...props
}: AlertActionAreaButtonProps) {
  if (variant === "assistive") {
    return (
      <AlertDialog.Cancel asChild>
        <TextButton color="assistive" className={className} {...props} />
      </AlertDialog.Cancel>
    );
  }

  if (variant === "negative") {
    return (
      <AlertDialog.Action asChild>
        <TextButton
          color="primary"
          className={cn(negativeClassName, className)}
          {...props}
        />
      </AlertDialog.Action>
    );
  }

  return (
    <AlertDialog.Action asChild>
      <TextButton color="primary" className={className} {...props} />
    </AlertDialog.Action>
  );
}

export {
  Alert,
  AlertTrigger,
  AlertContainer,
  AlertContent,
  AlertHeading,
  AlertDescription,
  AlertActionArea,
  AlertActionAreaButton,
};
export type { AlertActionAreaButtonProps };
