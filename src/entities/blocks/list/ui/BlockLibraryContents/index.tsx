"use client";

import Link from "next/link";

import { BlockBadge } from "./ui/BlockBadge";
import { BlockCertificateInfo } from "./ui/BlockCertificateInfo";
import { BlockContents } from "./ui/BlockContents";
import { BlockGraduationStatus } from "./ui/BlockGraduationStatus";
import { BlockInfoBox } from "./ui/BlockInfoBox";
import { BlockProgressPeriod } from "./ui/BlockProgressPeriod";

interface ANCHOR_WRAPPER extends LAYOUT_CHILD {
  href: string;
}

const AnchorWrapper = ({ href, children }: ANCHOR_WRAPPER) => {
  return (
    <Link className="block h-full p-[20px_24px]" href={href}>
      {children}
    </Link>
  );
};

export const BlockBasicInfoContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<BASIC_INFO_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"기본정보"} title={"기본정보"} />
      <BlockContents contents={item.title} />
    </AnchorWrapper>
  );
};

export const BlockCareerContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<CAREER_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"경력"} title={item.title} />
      <BlockInfoBox>
        <BlockProgressPeriod
          startDate={item.contentJson.startDate}
          endDate={item.contentJson.endDate}
        />
      </BlockInfoBox>
      <BlockContents contents={item.contentJson.achievements} />
    </AnchorWrapper>
  );
};

export const BlockSkillContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<SKILL_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"스킬"} title={item.contentJson.skillName} />
      {/* <BlockContents contents={item.title}/> */}
    </AnchorWrapper>
  );
};

export const BlockProjectContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<PROJECT_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"프로젝트"} title={item.contentJson.projectName} />
      <BlockInfoBox>
        <BlockProgressPeriod
          startDate={item.contentJson.startDate}
          endDate={item.contentJson.endDate}
        />
      </BlockInfoBox>
      <BlockContents contents={item.contentJson.problemSolving ?? ""} />
    </AnchorWrapper>
  );
};

export const BlockEducationContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<EDUCATION_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"학력"} title={item.contentJson.schoolName ?? ""} />
      <BlockInfoBox>
        <BlockProgressPeriod
          startDate={item.contentJson.startDate ?? ""}
          endDate={item.contentJson.endDate ?? ""}
        />
        <BlockGraduationStatus
          status={item.contentJson.graduationStatus ?? ""}
        />
      </BlockInfoBox>
      {/* <p>{item.contentJson.graduationStatus}</p> */}
      <BlockContents contents={item.title} />
    </AnchorWrapper>
  );
};

export const BlockCertificateContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<CERTIFICATE_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"수상・자격"} title={item.contentJson.name ?? ""} />
      <BlockInfoBox>
        <BlockCertificateInfo
          issuer={item.contentJson.issuer}
          issuedDate={item.contentJson.issuedDate}
        />
      </BlockInfoBox>
    </AnchorWrapper>
  );
};

export const BlockActivityContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<ACTIVITY_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"활동・교육"} title={item.contentJson.activityName} />
      <BlockInfoBox>
        <BlockProgressPeriod
          startDate={item.contentJson.startDate ?? ""}
          endDate={item.contentJson.endDate ?? ""}
        />
      </BlockInfoBox>
      <BlockContents contents={item.title} />
    </AnchorWrapper>
  );
};

export const BlockSummaryContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<SUMMARY_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"기본소개"} title={item.contentJson.title} />
      <BlockContents contents={item.contentJson.content} />
    </AnchorWrapper>
  );
};

export const BlockIntroductionContents = ({
  item,
}: {
  item: BLOCK_LIST_ITEM<INTRODUCTION_BLOCK_ITEM>;
}) => {
  return (
    <AnchorWrapper href={`/r/blocks/detail/${item.id}`}>
      <BlockBadge type={"자기소개서"} title={item.contentJson.title} />
      <BlockContents contents={item.contentJson.content} />
    </AnchorWrapper>
  );
};
