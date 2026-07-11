"use client";

export const BlockInfoBox = ({ children }: LAYOUT_CHILD) => {
  return (
    <p className="mt-[8px] flex gap-[8px] [&>span]:text-[0.8125rem] [&>span]:text-[#37383C9C]">
      {children}
    </p>
  );
};
