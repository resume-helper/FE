"use client";

import { Button } from "@/shared/ui/Button";
import { ChevronLeft, ChevronRight } from "@/shared/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBlocksCountsHook } from "@/entities/blocks/counts/hook/useBlocksCountsHook";
import { blocksTypesArr } from "@/shared/util/blocksTypesArr";

const paramsKey = "blockType";

export const BlocksLibraryCategoryNavi = () => {
  const navigation = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { totalCount, counts } = useBlocksCountsHook();

  function OnClickSelectCallback(type: BLOCK_TYPE | "ALL") {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "ALL") {
      if (params.has(paramsKey)) params.delete(paramsKey);
    } else {
      params.set(paramsKey, type);
    }

    navigation.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative mb-[20px] flex h-[48px] w-full items-center justify-between">
      <Button
        className="h-[32px] w-[32px] bg-[#f7f7f8] p-0"
        variant={"outlined"}
        color={"assistive"}
        size={"small"}
      >
        <ChevronLeft width={18} height={18} />
      </Button>

      <article className="w-[calc(100%-84px)] overflow-hidden">
        <h2 className="sr-only">카테고리 리스트</h2>

        <ul className="flex w-full gap-[10px] [&>li]:shrink-0 [&>li>button]:flex [&>li>button]:h-[40px] [&>li>button]:items-center [&>li>button]:justify-center [&>li>button]:rounded-[10px] [&>li>button]:border [&>li>button]:border-[#70737C29] [&>li>button]:px-[14px] [&>li>button]:text-[0.9375rem] [&>li>button]:font-[500] [&>li>button]:text-[#37383C9C]">
          <li>
            <Button
              onClick={() => OnClickSelectCallback("ALL")}
              className={`${!searchParams.get(paramsKey) && "bg-[#000] !text-[#fff]"}`}
              variant={"outlined"}
            >
              전체 ({totalCount})
            </Button>
          </li>
          {blocksTypesArr.map((el, i) => {
            return (
              <li key={`블록라이브러리-카테고리-버튼-${i}`}>
                <Button
                  className={`${searchParams.get(paramsKey) === el.type && "bg-[#000] !text-[#fff]"}`}
                  onClick={() => OnClickSelectCallback(el.type)}
                  variant={"outlined"}
                >
                  {el.title} ({counts.get(el.type)})
                </Button>
              </li>
            );
          })}
        </ul>
      </article>
      <Button
        className="h-[32px] w-[32px] bg-[#f7f7f8] p-0"
        variant={"outlined"}
        color={"assistive"}
        size={"small"}
      >
        <ChevronRight width={18} height={18} />
      </Button>
    </div>
  );
};
