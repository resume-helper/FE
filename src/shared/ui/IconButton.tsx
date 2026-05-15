import { Slot } from "radix-ui";
import { cn } from "@/shared/lib/cn";

type IconButtonVariant = "normal" | "background" | "outlined" | "solid";
type IconButtonSize = "medium" | "small";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  alternative?: boolean;
  asChild?: boolean;
  label: string;
  children: React.ReactNode;
};

function IconButton({
  variant = "normal",
  size = "medium",
  alternative = false,
  asChild = false,
  label,
  children,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  const isNormalOrBackground = variant === "normal" || variant === "background";
  const resolvedSize = isNormalOrBackground ? "medium" : size;
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      {...props}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center select-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        // 크기 (normal/background는 항상 medium 고정)
        resolvedSize === "medium" &&
          !isNormalOrBackground &&
          "rounded-full p-2.5",
        resolvedSize === "small" &&
          !isNormalOrBackground &&
          "rounded-full p-1.75",
        // normal: 배경 없는 아이콘 버튼, 인터랙션 오버레이는 버튼 영역 밖으로 확장
        variant === "normal" && [
          "rounded-full",
          "after:bg-label-normal after:absolute after:-inset-2 after:rounded-full",
          "after:opacity-0 after:transition-opacity after:duration-150",
          "hover:after:opacity-[0.05] focus-visible:after:opacity-[0.08] active:after:opacity-[0.12]",
          "disabled:after:hidden",
        ],
        // background: 반투명 원형 배경, alternative 시 어두운 색상
        variant === "background" && [
          "rounded-full p-1.5",
          !alternative && "bg-[rgba(255,255,255,0.35)] backdrop-blur-[32px]",
          alternative && "bg-[rgba(70,71,76,0.61)]",
          "disabled:bg-fill-alternative disabled:backdrop-blur-none",
          "after:bg-label-normal after:absolute after:inset-0 after:rounded-full",
          "after:opacity-0 after:transition-opacity after:duration-150",
          "hover:after:opacity-[0.05] focus-visible:after:opacity-[0.08] active:after:opacity-[0.12]",
          "disabled:after:hidden",
        ],
        // outlined: 테두리 있는 원형 버튼
        variant === "outlined" && [
          "border-line-normal-neutral overflow-hidden border",
          "after:bg-label-normal after:absolute after:inset-0",
          "after:opacity-0 after:transition-opacity after:duration-150",
          "hover:after:opacity-[0.05] focus-visible:after:opacity-[0.08] active:after:opacity-[0.12]",
          "disabled:after:hidden",
        ],
        // solid: primary 색상으로 채워진 버튼, 인터랙션 오버레이 강도 1.5배
        variant === "solid" && [
          "bg-primary-normal overflow-hidden",
          "disabled:bg-fill-normal",
          "after:bg-label-normal after:absolute after:inset-0",
          "after:opacity-0 after:transition-opacity after:duration-150",
          "hover:after:opacity-[0.075] focus-visible:after:opacity-[0.12] active:after:opacity-[0.18]",
          "disabled:after:hidden",
        ],
        className
      )}
    >
      <span
        className={cn(
          "relative flex items-center justify-center",
          variant === "normal" && [
            "size-6 text-[24px]",
            disabled && "text-label-disable",
          ],
          variant === "background" && [
            "size-5 text-[20px]",
            !alternative && "opacity-[0.61]",
            alternative && "opacity-[0.88]",
            disabled && "opacity-[0.22]",
          ],
          variant === "outlined" && [
            resolvedSize === "small"
              ? "size-4.5 text-[18px]"
              : "size-5 text-[20px]",
            disabled ? "text-label-disable" : "text-label-normal",
          ],
          variant === "solid" && [
            resolvedSize === "small"
              ? "size-4.5 text-[18px]"
              : "size-5 text-[20px]",
            disabled ? "text-label-disable" : "text-static-white",
          ]
        )}
      >
        {children}
      </span>
    </Comp>
  );
}

export { IconButton };
export type { IconButtonProps };
