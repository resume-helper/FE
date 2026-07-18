import { cn } from "@/shared/lib/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-fill-normal animate-pulse rounded-[3px]", className)}
      {...props}
    />
  );
}

export { Skeleton };
