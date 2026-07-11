"use client";

/** 블록 내용 */
export const BlockContents = ({ contents }: { contents: string }) => {
  return (
    <p className="mt-[8px] line-clamp-2 h-[48px] w-full text-[0.9375rem] text-[#2E2F33E0]">
      {contents}
    </p>
  );
};
