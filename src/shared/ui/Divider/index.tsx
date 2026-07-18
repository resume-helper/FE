"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const Variants = cva("block bg-[#70737C38]", {
  variants: {
    variant: { normal: "", thick: "" },
    vertical: { false: "", true: "" },
  },
  compoundVariants: [
    /** 가로 */
    {
      variant: "normal",
      vertical: false,
      className: "w-[32px] h-[1px]",
    },
    {
      variant: "thick",
      vertical: false,
      className: "w-[32px] h-[12px]",
    },

    /** 세로 */
    {
      variant: "normal",
      vertical: true,
      className: "w-[1px] h-[32px]",
    },
    {
      variant: "thick",
      vertical: true,
      className: "w-[12px] h-[32px]",
    },
  ],
  defaultVariants: {
    variant: "normal",
    vertical: false,
  },
});

type DIVIDER = COMPONENT_CLASS_NAME & VariantProps<typeof Variants>;

export const Divider = ({ className, variant, vertical }: DIVIDER) => {
  return (
    <div className={cn(Variants({ variant, vertical }), className ?? "")}></div>
  );
};
