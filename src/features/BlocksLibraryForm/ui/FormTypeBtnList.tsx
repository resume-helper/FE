"use client";

import { blocksTypesArr } from "@/shared/util/blocksTypesArr";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

const key = "blockType";

export const FormTypeBtnList = memo(() => {
  const searchParams = useSearchParams();

  const currentBlockType = searchParams.get(key) ?? "BASIC_INFO";

  const navigation = useRouter();

  function OnClickNaviCallback(type: BLOCK_TYPE) {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "BASIC_INFO") {
      if (params.has(key)) params.delete(key);
    } else {
      params.set(key, type);
    }

    navigation.replace(`?${params.toString()}`);
  }
  return (
    <article>
      <h2 className="sr-only">블록 생성 카테고리 리스트</h2>
      <ul className="mb-[24px] flex w-full gap-[10px]">
        {blocksTypesArr.map((el, i) => {
          return (
            <li
              key={`블록생성카테고리리스트-${el.title}-${el.type}-${i}`}
              className="shrink-0"
            >
              <button
                onClick={() => OnClickNaviCallback(el.type)}
                type="button"
                className={`flex h-[40px] items-center justify-center px-[14px] ${el.type === currentBlockType ? "bg-[#000] text-[#fff]" : "text-[#37383C9C]"} rounded-[10px] border border-[#70737C29] text-[0.9375rem] font-[500]`}
              >
                {el.title}
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
});
