"use client";

import { useBlocksListHook } from "@/entities/blocks/list/hook/useBlocksListHook";

import { BlockLibraryEmpty } from "@/entities/blocks/list/ui/BlockLibraryEmpty";
import {
  LatestBlockLibraryActivityItem,
  LatestBlockLibraryBasicInfoItem,
  LatestBlockLibraryCareerItem,
  LatestBlockLibraryCertificateItem,
  LatestBlockLibraryEducationItem,
  LatestBlockLibraryIntroductionItem,
  LatestBlockLibraryProjectItem,
  LatestBlockLibrarySkillItem,
  LatestBlockLibrarySummaryItem,
} from "@/entities/blocks/list/ui/BlockLibraryLatestItems";
import { List } from "@/shared/ui/ListCell";

const TYPES = {
  BASIC_INFO: "기본정보",
  CAREER: "경력",
  SKILL: "스킬",
  PROJECT: "프로젝트",
  EDUCATION: "학력",
  CERTIFICATE: "수상・자격",
  ACTIVITY: "활동",
  SUMMARY: "기본소개",
  INTRODUCTION: "자기소개서",
};

export const LatestBlocksLibraryList = () => {
  const { latest, total } = useBlocksListHook();

  return (
    <List>
      {total === 0 ? (
        <BlockLibraryEmpty />
      ) : (
        <>
          {latest?.map((el, i) => {
            return (
              <li
                key={`최근등록한-블록라이브러리-${el.title}-${i}`}
                className="flex h-[78px] items-center"
              >
                <span className="mr-[16px] h-[24px] w-[56px] shrink-0 rounded-[6px] bg-[#EBF7F9] text-center text-[0.75rem] leading-[24px] text-[#0098B2]">
                  {TYPES[el.type as keyof typeof TYPES]}
                </span>
                {el.type === "BASIC_INFO" && (
                  <LatestBlockLibraryBasicInfoItem
                    item={el as BLOCK_LIST_ITEM<BASIC_INFO_BLOCK_ITEM>}
                  />
                )}
                {el.type === "CAREER" && (
                  <LatestBlockLibraryCareerItem
                    item={el as BLOCK_LIST_ITEM<CAREER_BLOCK_ITEM>}
                  />
                )}
                {el.type === "SKILL" && (
                  <LatestBlockLibrarySkillItem
                    item={el as BLOCK_LIST_ITEM<SKILL_BLOCK_ITEM>}
                  />
                )}
                {el.type === "SUMMARY" && (
                  <LatestBlockLibrarySummaryItem
                    item={el as BLOCK_LIST_ITEM<SUMMARY_BLOCK_ITEM>}
                  />
                )}
                {el.type === "EDUCATION" && (
                  <LatestBlockLibraryEducationItem
                    item={el as BLOCK_LIST_ITEM<EDUCATION_BLOCK_ITEM>}
                  />
                )}
                {el.type === "PROJECT" && (
                  <LatestBlockLibraryProjectItem
                    item={el as BLOCK_LIST_ITEM<PROJECT_BLOCK_ITEM>}
                  />
                )}
                {el.type === "CERTIFICATE" && (
                  <LatestBlockLibraryCertificateItem
                    item={el as BLOCK_LIST_ITEM<CERTIFICATE_BLOCK_ITEM>}
                  />
                )}
                {el.type === "ACTIVITY" && (
                  <LatestBlockLibraryActivityItem
                    item={el as BLOCK_LIST_ITEM<ACTIVITY_BLOCK_ITEM>}
                  />
                )}
                {el.type === "INTRODUCTION" && (
                  <LatestBlockLibraryIntroductionItem
                    item={el as BLOCK_LIST_ITEM<INTRODUCTION_BLOCK_ITEM>}
                  />
                )}
              </li>
            );
          })}
        </>
      )}
    </List>
  );
};
