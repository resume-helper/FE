"use client";

import { EDUCATION_LEVEL_OPTIONS } from "@/entities/blocks/editor/model/blockEditorMeta";
import { DateFormat } from "@/shared/util/dateFormat";

const COMMON_WIDTH = "w-[320px]";

// 학력 레벨 enum → 한글 라벨 (원시 enum `COLLEGE_OR_ABOVE` 노출 방지)
const EDUCATION_LEVEL_LABEL: Record<string, string> = Object.fromEntries(
  EDUCATION_LEVEL_OPTIONS.map((o) => [o.value, o.label])
);

export const LatestBlockLibraryCareerItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<CAREER_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.contentJson.startDate, "yyyy-mm")} -{" "}
        {DateFormat(item.contentJson.endDate, "yyyy-mm")}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryBasicInfoItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<BASIC_INFO_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.createdAt, "yyyy-mm-dd")}
      </dd>
    </dl>
  );
};

export const LatestBlockLibrarySkillItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<SKILL_BLOCK_ITEM>;
}) => {
  return (
    <h3 className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
      {item.title}
    </h3>
  );
};

export const LatestBlockLibrarySummaryItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<SUMMARY_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.contentJson.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {item.contentJson.content}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryEducationItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<EDUCATION_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {EDUCATION_LEVEL_LABEL[item.contentJson.educationLevel] ??
          item.contentJson.educationLevel}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryProjectItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<PROJECT_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.contentJson.startDate, "yyyy-mm")} -{" "}
        {DateFormat(item.contentJson.endDate, "yyyy-mm")}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryCertificateItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<CERTIFICATE_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.contentJson.name}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.contentJson.issuedDate, "yyyy-mm")}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryActivityItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<ACTIVITY_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.contentJson.activityName}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.contentJson.startDate, "yyyy-mm")} -{" "}
        {DateFormat(item.contentJson.endDate, "yyyy-mm")}
      </dd>
    </dl>
  );
};

export const LatestBlockLibraryIntroductionItem = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<INTRODUCTION_BLOCK_ITEM>;
}) => {
  return (
    <dl>
      <dt className={`${COMMON_WIDTH} truncate text-[1.0625rem] font-[500]`}>
        {item.contentJson.title}
      </dt>
      <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
        {DateFormat(item.createdAt, "yyyy-mm")}
      </dd>
    </dl>
  );
};
