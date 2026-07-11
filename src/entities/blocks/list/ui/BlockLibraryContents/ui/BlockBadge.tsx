"use client";

interface BLOCK_BADGE {
  type: string;
  title: string;
}

export const BlockBadge = ({ type, title }: BLOCK_BADGE) => {
  return (
    <h3 className="flex gap-[8px]">
      <span className="h-[20px] min-w-[62px] shrink-0 rounded-[6px] bg-[#EBF7F9] px-[_11px] text-center text-[0.6875rem] leading-[20px] font-[500] tracking-[3.11%] text-[#0098B2]">
        {type}
      </span>
      <span className="w-[calc(100%-75px)] truncate">{title}</span>
    </h3>
  );
};
