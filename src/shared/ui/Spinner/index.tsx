import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const spinnerVariants = cva("text-line-solid-normal", {
  variants: {
    size: {
      sm: "size-4.5",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
});

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string;
};

function Spinner({ size, className }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size }), className)}
    >
      <circle cx="14" cy="14" r="12.5" className="spinner-circle" />
    </svg>
  );
}

export { Spinner };
