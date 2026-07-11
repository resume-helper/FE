"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/Button";

export const LatestBlockLibraryEmpty = () => {
  return (
    <li className="mt-[204px] text-center">
      <dl>
        <dt className="text-[1.0625rem] font-[500]">작성된 블록이 없어요.</dt>
        <dd className="mt-[4px] text-[0.9375rem] text-[#2E2F33E0]">
          경험을 블록을 정리해보세요.
        </dd>
      </dl>
      <Button
        className="mt-[16px]"
        color={"assistive"}
        size={"small"}
        variant={"solid"}
        as={Link}
        href={"/r/blocks/add"}
      >
        블록 생성
      </Button>
    </li>
  );
};
