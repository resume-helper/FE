import type { EditorBlockType } from "./blockContentSchemas";

/** 블록 유형 선택 탭 순서 (기획 8.2.1 — 첫 진입 = 기본 정보) */
export const BLOCK_EDITOR_TYPES: EditorBlockType[] = [
  "BASIC_INFO",
  "SUMMARY",
  "CAREER",
  "SKILL",
  "PROJECT",
  "INTRODUCTION",
  "EDUCATION",
  "CERTIFICATE",
  "ACTIVITY",
];

export const BLOCK_TYPE_LABELS: Record<EditorBlockType, string> = {
  BASIC_INFO: "기본 정보",
  SUMMARY: "간단 소개",
  CAREER: "경력",
  SKILL: "기술스택",
  PROJECT: "프로젝트",
  INTRODUCTION: "자기소개",
  EDUCATION: "학력",
  CERTIFICATE: "수상·자격",
  ACTIVITY: "활동·교육",
};

/**
 * 블록별 대표 제목 필드 (기획 8.2.3 — 임시저장·블록 title 로 사용).
 * EDUCATION 은 분기: 기타 학력이면 institutionName, 그 외 schoolName.
 */
export function getRepresentativeTitle(
  type: EditorBlockType,
  content: Record<string, unknown>
): string {
  const pick = (key: string) => {
    const v = content[key];
    return typeof v === "string" ? v.trim() : "";
  };
  switch (type) {
    case "BASIC_INFO":
      return pick("name");
    case "SUMMARY":
    case "INTRODUCTION":
      return pick("title");
    case "CAREER":
      return pick("companyName");
    case "PROJECT":
      return pick("projectName");
    case "SKILL":
      return pick("skillName");
    case "EDUCATION":
      return content["educationLevel"] === "OTHER"
        ? pick("institutionName")
        : pick("schoolName");
    case "CERTIFICATE":
      return pick("name");
    case "ACTIVITY":
      return pick("activityName");
  }
}

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "FULL_TIME", label: "정규직" },
  { value: "CONTRACT", label: "계약직" },
  { value: "INTERN", label: "인턴" },
  { value: "FREELANCER", label: "프리랜서" },
] as const;

export const PROFICIENCY_OPTIONS = [
  { value: "HIGH", label: "상" },
  { value: "MEDIUM", label: "중" },
  { value: "LOW", label: "하" },
] as const;

export const EDUCATION_LEVEL_OPTIONS = [
  { value: "COLLEGE_OR_ABOVE", label: "대학·대학원 이상 졸업" },
  { value: "HIGH_SCHOOL", label: "고등학교 졸업" },
  { value: "OTHER", label: "기타 학력" },
] as const;

export const UNIVERSITY_TYPE_OPTIONS = [
  { value: "BACHELORS", label: "4년제" },
  { value: "ASSOCIATE", label: "2·3년제" },
  { value: "MASTERS", label: "대학원 석사" },
  { value: "DOCTORATE", label: "대학원 박사" },
] as const;

export const GRADUATION_STATUS_OPTIONS = [
  { value: "GRADUATED", label: "졸업" },
  { value: "ENROLLED", label: "재학" },
  { value: "ON_LEAVE", label: "휴학" },
  { value: "EXPECTED_GRADUATION", label: "졸업 예정" },
  { value: "DROPPED_OUT", label: "중퇴" },
  { value: "COMPLETED", label: "수료" },
] as const;

/** 고등학교 전용 — ON_LEAVE·COMPLETED 는 대학 전용 값 (BE 검증 미러) */
export const HIGH_SCHOOL_GRADUATION_STATUS_OPTIONS =
  GRADUATION_STATUS_OPTIONS.filter(
    (o) => o.value !== "ON_LEAVE" && o.value !== "COMPLETED"
  );

export const MAJOR_TYPE_OPTIONS = [
  { value: "DOUBLE_MAJOR", label: "복수전공" },
  { value: "MINOR", label: "부전공" },
] as const;

export const MAJOR_FIELD_OPTIONS = [
  { value: "GENERAL", label: "일반계" },
  { value: "SPECIALIZED_SCIENCE_FOREIGN", label: "특성화(과학·외국어)" },
  { value: "VOCATIONAL_MEISTER", label: "직업·마이스터" },
] as const;

export const COMPLETED_OPTIONS = [
  { value: "COMPLETED", label: "이수" },
  { value: "IN_PROGRESS", label: "이수 중" },
  { value: "DISCONTINUED", label: "중단" },
] as const;

export const CERTIFICATE_TYPE_OPTIONS = [
  { value: "AWARD_CONTEST", label: "수상·공모전" },
  { value: "CERTIFICATE", label: "자격증" },
  { value: "LANGUAGE", label: "어학" },
  { value: "OTHER", label: "기타" },
] as const;

export const ACTIVITY_TYPE_OPTIONS = [
  { value: "SCHOOL_ACTIVITY", label: "교내활동" },
  { value: "EXTERNAL_ACTIVITY", label: "대외활동" },
  { value: "INTERN", label: "인턴" },
  { value: "EDUCATION_TRAINING", label: "교육·연수" },
  { value: "OTHER", label: "기타" },
] as const;
