"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip, FlexBox, TextButton, Typography } from "@wanteddev/wds";
import { IconCheck, IconChevronLeft } from "@wanteddev/wds-icon";
import { CareerForm } from "./_components/CareerForm";
import { ProjectForm } from "./_components/ProjectForm";
import { SkillsForm } from "./_components/SkillsForm";
import { IntroductionForm } from "./_components/IntroductionForm";
import { EducationForm } from "./_components/EducationForm";
import { AwardForm } from "./_components/AwardForm";
import { ActivityForm } from "./_components/ActivityForm";
import { BasicInfoForm } from "./_components/BasicInfoForm";
import { SummaryForm } from "./_components/SummaryForm";

type BlockType =
  | "CAREER"
  | "PROJECT"
  | "SKILL"
  | "INTRODUCTION"
  | "EDUCATION"
  | "CERTIFICATE"
  | "ACTIVITY"
  | "BASIC_INFO"
  | "SUMMARY";

const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  CAREER: "경력",
  PROJECT: "프로젝트",
  SKILL: "기술스택",
  INTRODUCTION: "자기소개",
  EDUCATION: "학력",
  CERTIFICATE: "수상・자격",
  ACTIVITY: "활동・교육",
  BASIC_INFO: "기본정보",
  SUMMARY: "기본소개",
};

const BLOCK_TYPES: BlockType[] = [
  "CAREER",
  "PROJECT",
  "SKILL",
  "INTRODUCTION",
  "EDUCATION",
  "CERTIFICATE",
  "ACTIVITY",
  "BASIC_INFO",
  "SUMMARY",
];

const FORM_MAP: Record<BlockType, React.ReactNode> = {
  CAREER: <CareerForm />,
  PROJECT: <ProjectForm />,
  SKILL: <SkillsForm />,
  INTRODUCTION: <IntroductionForm />,
  EDUCATION: <EducationForm />,
  CERTIFICATE: <AwardForm />,
  ACTIVITY: <ActivityForm />,
  BASIC_INFO: <BasicInfoForm />,
  SUMMARY: <SummaryForm />,
};

export default function Page() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<BlockType>("CAREER");

  return (
    <FlexBox flexDirection="column" gap="20px">
      <TextButton
        color="assistive"
        leadingContent={<IconChevronLeft />}
        onClick={() => router.push("/block-library")}
      >
        뒤로가기
      </TextButton>

      <FlexBox alignItems="center" justifyContent="space-between">
        <Typography variant="title1" weight="medium">
          {BLOCK_TYPE_LABELS[selectedType]}
        </Typography>

        <FlexBox alignItems="center" gap="8px">
          <Button variant="outlined" color="assistive">
            임시저장ㅣ0
          </Button>
          <Button leadingContent={<IconCheck />}>저장</Button>
        </FlexBox>
      </FlexBox>

      <FlexBox alignItems="center" gap="10px">
        {BLOCK_TYPES.map((type) => (
          <Chip
            key={type}
            variant={selectedType === type ? "solid" : "outlined"}
            active={selectedType === type}
            onClick={() => setSelectedType(type)}
          >
            {BLOCK_TYPE_LABELS[type]}
          </Chip>
        ))}
      </FlexBox>

      {FORM_MAP[selectedType]}
    </FlexBox>
  );
}
