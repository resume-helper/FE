"use client";

import Link from "next/link";

import { ChevronRight } from "@/shared/icons";

import { LatestBlocksLibraryList } from "@/features/LatestBlocksLibraryList";

export const LatestBlockLibararyBox = () => {
  return (
    <article className="w-full">
      <h2 className="flex h-[56px] items-center justify-between border-b border-b-[#70737C14] text-[1.25rem] font-[600]">
        블록 라이브러리{" "}
        <Link href={"/r/blocks"}>
          <ChevronRight />
        </Link>
      </h2>
      <LatestBlocksLibraryList />
    </article>
  );
};
