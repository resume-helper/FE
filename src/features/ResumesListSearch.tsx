"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useRef } from "react";

import { Select, SelectItem } from "@/shared/ui/Select";
import { SvgSearch } from "@/shared/icons/Search";

/** 검색어 */
const SEARCH_KEYWORD = "searchKeyword";

/** 게시물 정렬 (최신순,오래된순) */
const SEARCH_SORT = "searchSort";

export const ResumesListSearch = () => {
  const navigation = useRouter();

  const searchParams = useSearchParams();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const defaultKeyword = searchParams.get(SEARCH_KEYWORD);

  const defaultSort = searchParams.get(SEARCH_SORT);

  function OnInputCallback(e: React.InputEvent<HTMLInputElement>) {
    const value = e.currentTarget.value.trim();

    if (value === defaultKeyword) return;

    if (debounceTimerRef["current"]) {
      clearTimeout(debounceTimerRef["current"]);
      debounceTimerRef["current"] = null;
    }

    debounceTimerRef["current"] = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(SEARCH_KEYWORD, value);
      } else {
        if (!params.has(SEARCH_KEYWORD)) return;

        params.delete(SEARCH_KEYWORD);
      }

      navigation.replace(`?${params.toString()}`);
    }, 500);
  }

  function OnValueChangeCallback(selected: string | string[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (selected === "NEWEST") {
      params.delete(SEARCH_SORT);
    } else {
      params.set(SEARCH_SORT, selected as SORT_TYPE);
    }

    navigation.replace(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center">
      <div className="flex h-[40px] w-[240px] items-center gap-[12px] border border-[#E0E0E0] px-[10px] px-[16px] text-[#33333380]">
        <SvgSearch />
        <input
          defaultValue={defaultKeyword ?? ""}
          onInput={OnInputCallback}
          className="border-none text-[0.875rem] outline-none"
          type="text"
          placeholder="이력서 제목 검색"
        />
      </div>
      <Select
        defaultValue={defaultSort ?? "NEWEST"}
        onValueChange={OnValueChangeCallback}
        className="ml-[8px] w-[136px] outline-none"
      >
        <SelectItem value="NEWEST">최신순</SelectItem>
        <SelectItem value="OLDEST">오래된순</SelectItem>
      </Select>
    </div>
  );
};
