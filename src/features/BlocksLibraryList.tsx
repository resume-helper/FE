"use client";

import { useEffect } from "react";

import { useBlocksListHook } from "@/entities/blocks/list/hook/useBlocksListHook";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { List } from "@/shared/ui/ListCell";
import { Spinner } from "@/shared/ui/Spinner";
import { DateFormat } from "@/shared/util/dateFormat";

import {
  BlockActivityContents,
  BlockBasicInfoContents,
  BlockCareerContents,
  BlockCertificateContents,
  BlockEducationContents,
  BlockIntroductionContents,
  BlockProjectContents,
  BlockSkillContents,
  BlockSummaryContents,
} from "../entities/blocks/list/ui/BlockLibraryContents";
import { ListLoadingIcon } from "@/shared/ui/ListLoadingIcon";
import { BlockLibraryEmpty } from "@/entities/blocks/list/ui/BlockLibraryEmpty";

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
      {total === 0 ? (
        <BlockLibraryEmpty />
      ) : (
        <>
          {data?.pages.map((page) => {
            const list = page.content;

            return list?.map((el, i) => {
              return (
                <li
                  className="relative h-[186px] w-[calc(50%-6px)] rounded-[12px] bg-[#fff]"
                  key={`블록라이브러리-${el.title}-${i}`}
                >
                  {el.type === "BASIC_INFO" && (
                    <BlockBasicInfoContents
                      item={el as BLOCK_LIST_ITEM<BASIC_INFO_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "CAREER" && (
                    <BlockCareerContents
                      item={el as BLOCK_LIST_ITEM<CAREER_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "SKILL" && (
                    <BlockSkillContents
                      item={el as BLOCK_LIST_ITEM<SKILL_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "PROJECT" && (
                    <BlockProjectContents
                      item={el as BLOCK_LIST_ITEM<PROJECT_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "EDUCATION" && (
                    <BlockEducationContents
                      item={el as BLOCK_LIST_ITEM<EDUCATION_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "CERTIFICATE" && (
                    <BlockCertificateContents
                      item={el as BLOCK_LIST_ITEM<CERTIFICATE_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "ACTIVITY" && (
                    <BlockActivityContents
                      item={el as BLOCK_LIST_ITEM<ACTIVITY_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "SUMMARY" && (
                    <BlockSummaryContents
                      item={el as BLOCK_LIST_ITEM<SUMMARY_BLOCK_ITEM>}
                    />
                  )}
                  {el.type === "INTRODUCTION" && (
                    <BlockIntroductionContents
                      item={el as BLOCK_LIST_ITEM<INTRODUCTION_BLOCK_ITEM>}
                    />
                  )}
                  <p className="absolute bottom-[20px] left-[24px] text-[0.875rem] text-[#37383C9C]">
                    {DateFormat(el.createdAt, "yyyy-mm-dd")}
                  </p>
                </li>
              );
            });
          })}
        </>
      )}
      {(isLoading || isFetching) && <ListLoadingIcon />}
      <li ref={ref} style={{ height: "1px" }}></li>
    </List>
  );
};
