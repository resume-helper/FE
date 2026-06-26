"use client";

import { useEffect } from "react";

import { useBlocksListHook } from "@/entities/blocks/list/hook/useBlocksListHook";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { List } from "@/shared/ui/ListCell";
import { Spinner } from "@/shared/ui/Spinner";
import { DateFormat } from "@/shared/util/dateFormat";
import { BlockLibraryProjectItem } from "@/entities/blocks/list/ui/BlockLibraryItem";

export const BlocksLibraryList = () => {
  const { total, data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useBlocksListHook();

  const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
    threshold: 0,
  });

  useEffect(() => {
    if (!isView) return;
    if (isLoading) return;
    if (total === 0) return;
    if (isFetching) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [isView]);

  return (
    <List className="mb-[20px] flex-row flex-wrap gap-[12px]">
      {data?.pages.map((page) => {
        const list = page.content;

        return list?.map((el, i) => {
          return (
            <li
              className="relative h-[186px] w-[calc(50%-6px)] rounded-[12px] bg-[#fff] p-[20px_24px]"
              key={`블록라이브러리-${el.title}-${i}`}
            >
              <h3 className="flex gap-[8px] truncate">
                <span className="h-[20px] shrink-0 rounded-[6px] bg-[#EBF7F9] px-[_11px] text-center text-[0.6875rem] leading-[24px] font-[500] text-[#0098B2]">
                  {el.type}
                </span>
                {el.title}
              </h3>

              {el.type === "PROJECT" && (
                <BlockLibraryProjectItem
                  item={el.contentJson as PROJECT_BLOCK_ITEM}
                />
              )}

              <p className="absolute bottom-[20px] left-[24px] text-[0.875rem] text-[#37383C9C]">
                {DateFormat(el.createdAt, "yyyy-mm-dd")}
              </p>
            </li>
          );
        });
      })}
      {/* {Array.from({ length: 7 }).map((_, i) => {
        return (
          <li
            className="w-[calc(50%-6px)] p-[20px_24px] bg-[#fff]"
            key={`블록라이브러리-더미-${i}`}
          >
            <h3 className="flex">
              <span className="shrink-0 w-[62px] h-[20px] rounded-[6px] bg-[#EBF7F9] text-center text-[0.75rem] leading-[24px] text-[#0098B2]">
                경력
              </span>       
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis atque ab, reiciendis non iste impedit? Iusto, iure.
                Assumenda dignissimos repellendus minima eius? Nisi vero odio
                esse exercitationem obcaecati quam amet.       
            </h3>
          </li>
        );
      })} */}

      {isLoading ||
        (isFetching && (
          <li>
            <Spinner className="absolute bottom-[0px] left-1/2 -translate-1/2" />
          </li>
        ))}
      <li ref={ref} style={{ height: "1px" }}></li>
    </List>
  );
};
