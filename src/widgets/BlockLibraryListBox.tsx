"use client";

import Link from "next/link";

import { BlocksLibraryList } from "@/features/BlocksLibraryList";
import { Button } from "@/shared/ui/Button";
import { BlocksLibraryCategoryNavi } from "@/features/BlocksLibraryCategoryNavi";

export const BlockLibraryListBox = () => {
  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        경험을 블록으로 쌓아두세요.
        <Button as={Link} href={"/r/blocks/add"}>
          블록 생성
        </Button>
      </h2>
      <BlocksLibraryCategoryNavi />
      <BlocksLibraryList />
    </section>
  );
};
