"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useWatch,
} from "react-hook-form";

import {
  ACTIVITY_TYPE_OPTIONS,
  CERTIFICATE_TYPE_OPTIONS,
  COMPLETED_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  GRADUATION_STATUS_OPTIONS,
  HIGH_SCHOOL_GRADUATION_STATUS_OPTIONS,
  MAJOR_FIELD_OPTIONS,
  MAJOR_TYPE_OPTIONS,
  PROFICIENCY_OPTIONS,
  UNIVERSITY_TYPE_OPTIONS,
} from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";
import { CheckBox } from "@/shared/ui/CheckBox";
import { TextArea } from "@/shared/ui/TextArea";

import { RhfSelect, RhfTextField } from "./fields";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyControl = Control<any>;

function RhfTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[8px]">
          <span className="text-label-1-normal-medium">{label}</span>
          <TextArea
            placeholder={placeholder}
            value={(field.value as string) ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          {fieldState.error && (
            <span className="text-label-2-medium text-status-negative">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

function BasicInfoForm({ control }: { control: AnyControl }) {
  return (
    <>
      <p className="text-label-1-normal-medium text-label-alternative">
        기본 정보 블록이 있어야 이력서를 만들 수 있어요
      </p>
      <RhfTextField control={control} name="name" label="이름" required />
      <RhfTextField
        control={control}
        name="email"
        label="이메일"
        required
        tip="소셜 로그인 계정의 이메일이 자동 입력돼요"
      />
      <RhfTextField
        control={control}
        name="phoneNumber"
        label="전화번호"
        required
        placeholder="010-0000-0000"
      />
    </>
  );
}

function TitleContentForm({ control }: { control: AnyControl }) {
  return (
    <>
      <RhfTextField control={control} name="title" label="제목" required />
      <RhfTextArea control={control} name="content" label="상세 내용" />
    </>
  );
}

function CareerForm({ control }: { control: AnyControl }) {
  return (
    <>
      <RhfTextField
        control={control}
        name="companyName"
        label="회사명"
        required
      />
      <RhfSelect
        control={control}
        name="employmentType"
        label="재직 형태"
        required
        options={EMPLOYMENT_TYPE_OPTIONS}
      />
      <RhfTextField
        control={control}
        name="department"
        label="근무부서"
        required
      />
      <RhfTextField control={control} name="jobTitle" label="직무" required />
      <RhfTextField
        control={control}
        name="position"
        label="직급/직책"
        required
      />
      <RhfTextField
        control={control}
        name="startDate"
        label="입사년월"
        required
        placeholder="YYYY.MM"
      />
      <RhfTextField
        control={control}
        name="endDate"
        label="퇴사년월"
        required
        placeholder="YYYY.MM"
      />
      <RhfTextArea
        control={control}
        name="achievements"
        label="주요 성과"
        placeholder="담당 업무와 성과를 수치와 함께 적어보세요"
      />
    </>
  );
}

function SkillForm({ control }: { control: AnyControl }) {
  return (
    <>
      <RhfTextField
        control={control}
        name="skillName"
        label="기술스택명"
        required
      />
      <RhfSelect
        control={control}
        name="proficiency"
        label="숙련도"
        options={PROFICIENCY_OPTIONS}
      />
      <RhfTextField
        control={control}
        name="usageScope"
        label="활용범위"
        required
      />
    </>
  );
}

function ProjectForm({ control }: { control: AnyControl }) {
  return (
    <>
      <RhfTextField
        control={control}
        name="projectName"
        label="프로젝트명"
        required
      />
      <RhfTextField
        control={control}
        name="startDate"
        label="시작일"
        required
        placeholder="YYYY.MM.DD"
      />
      <RhfTextField
        control={control}
        name="endDate"
        label="종료일"
        required
        placeholder="YYYY.MM.DD"
      />
      <RhfTextField
        control={control}
        name="problemSolving"
        label="문제 해결 과정"
        tip="문제 → 해결 → 결과 순서로 적으면 좋아요"
      />
      <RhfTextField
        control={control}
        name="link"
        label="링크"
        placeholder="GitHub, 배포 URL 등"
      />
    </>
  );
}

function EducationForm({ control }: { control: AnyControl }) {
  const level = useWatch({ control, name: "educationLevel" });
  const isGed = useWatch({ control, name: "isGed" });

  return (
    <>
      <RhfSelect
        control={control}
        name="educationLevel"
        label="학력 구분"
        required
        options={EDUCATION_LEVEL_OPTIONS}
      />

      {level === "COLLEGE_OR_ABOVE" && (
        <>
          <RhfSelect
            control={control}
            name="universityType"
            label="대학 구분"
            required
            options={UNIVERSITY_TYPE_OPTIONS}
          />
          <RhfTextField
            control={control}
            name="schoolName"
            label="학교명"
            required
          />
          <RhfTextField control={control} name="major" label="전공" required />
          <RhfSelect
            control={control}
            name="graduationStatus"
            label="졸업 여부"
            required
            options={GRADUATION_STATUS_OPTIONS}
          />
          <RhfTextField
            control={control}
            name="startDate"
            label="입학년월"
            required
            placeholder="YYYY.MM"
          />
          <RhfTextField
            control={control}
            name="endDate"
            label="졸업년월"
            required
            placeholder="YYYY.MM"
          />
          <RhfTextField
            control={control}
            name="doubleMajor"
            label="추가 전공"
          />
          <RhfSelect
            control={control}
            name="majorType"
            label="전공 구분"
            options={MAJOR_TYPE_OPTIONS}
          />
          <Controller
            control={control}
            name="isTransfer"
            render={({ field }) => (
              <CheckBox
                label="편입"
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
        </>
      )}

      {level === "HIGH_SCHOOL" && (
        <>
          <Controller
            control={control}
            name="isGed"
            render={({ field }) => (
              <CheckBox
                label="대입 검정고시"
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          {!isGed && (
            <>
              <RhfTextField
                control={control}
                name="schoolName"
                label="학교명"
                required
              />
              <RhfSelect
                control={control}
                name="graduationStatus"
                label="졸업 여부"
                required
                options={HIGH_SCHOOL_GRADUATION_STATUS_OPTIONS}
              />
              <RhfSelect
                control={control}
                name="majorField"
                label="전공계열"
                options={MAJOR_FIELD_OPTIONS}
              />
              <RhfTextField control={control} name="major" label="전공" />
              <RhfTextField
                control={control}
                name="startDate"
                label="입학년월"
                placeholder="YYYY.MM"
              />
            </>
          )}
          <RhfTextField
            control={control}
            name="endDate"
            label={isGed ? "합격년월" : "졸업년월"}
            placeholder="YYYY.MM"
          />
        </>
      )}

      {level === "OTHER" && (
        <>
          <RhfTextField
            control={control}
            name="educationType"
            label="학력 유형"
            required
            placeholder="예) 학점인증제, 평생교육원"
          />
          <RhfTextField
            control={control}
            name="institutionName"
            label="기관명"
            required
          />
          <RhfSelect
            control={control}
            name="completed"
            label="이수 여부"
            required
            options={COMPLETED_OPTIONS}
          />
          <RhfTextField
            control={control}
            name="startDate"
            label="시작년월"
            placeholder="YYYY.MM"
          />
          <RhfTextField
            control={control}
            name="endDate"
            label="종료년월"
            placeholder="YYYY.MM"
          />
        </>
      )}
    </>
  );
}

function CertificateForm({ control }: { control: AnyControl }) {
  const certType = useWatch({ control, name: "certificateType" });

  return (
    <>
      <RhfSelect
        control={control}
        name="certificateType"
        label="수상·자격 구분"
        required
        options={CERTIFICATE_TYPE_OPTIONS}
      />
      <RhfTextField
        control={control}
        name="name"
        label="수상·자격증명"
        required
      />
      <RhfTextField
        control={control}
        name="issuedDate"
        label="수상·취득일"
        required
        placeholder="YYYY.MM"
      />
      <RhfTextField
        control={control}
        name="issuer"
        label="수여·발급 기관"
        required
      />
      {certType === "LANGUAGE" && (
        <RhfTextField control={control} name="scoreGrade" label="점수/등급" />
      )}
      {certType === "OTHER" && (
        <RhfTextField control={control} name="category" label="구분" required />
      )}
    </>
  );
}

function ActivityForm({ control }: { control: AnyControl }) {
  return (
    <>
      <RhfSelect
        control={control}
        name="activityType"
        label="활동 구분"
        required
        options={ACTIVITY_TYPE_OPTIONS}
      />
      <RhfTextField
        control={control}
        name="activityName"
        label="활동명"
        required
      />
      <RhfTextField
        control={control}
        name="organizationName"
        label="기관/장소명"
        required
      />
      <RhfTextField
        control={control}
        name="startDate"
        label="시작년월"
        required
        placeholder="YYYY.MM"
      />
      <RhfTextField
        control={control}
        name="endDate"
        label="종료년월"
        required
        placeholder="YYYY.MM"
      />
      <RhfTextArea
        control={control}
        name="description"
        label="경험/활동 내역"
      />
    </>
  );
}

export function BlockContentForm({
  type,
  control,
}: {
  type: EditorBlockType;
  control: AnyControl;
}) {
  switch (type) {
    case "BASIC_INFO":
      return <BasicInfoForm control={control} />;
    case "SUMMARY":
    case "INTRODUCTION":
      return <TitleContentForm control={control} />;
    case "CAREER":
      return <CareerForm control={control} />;
    case "SKILL":
      return <SkillForm control={control} />;
    case "PROJECT":
      return <ProjectForm control={control} />;
    case "EDUCATION":
      return <EducationForm control={control} />;
    case "CERTIFICATE":
      return <CertificateForm control={control} />;
    case "ACTIVITY":
      return <ActivityForm control={control} />;
  }
}
