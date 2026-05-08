import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("text-line-solid-normal size-7 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
