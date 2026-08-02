import { z } from "zod";

/**
 * 블록 타입별 contentJson 스키마 — SSOT = BE `BlockContentValidator`
 * (BE/doc/CONTENT_JSON_SCHEMA.md). BE 실검증과 어긋나면 저장이 400으로 거절된다.
 */

const YYYY_MM = /^\d{4}\.(0[1-9]|1[0-2])$/;
const YYYY_MM_DD = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
const PHONE = /^010-\d{4}-\d{4}$/;

// z.string({ error }) — 값이 undefined(미입력)일 때도 기본 영어 타입 에러
// ("Invalid input: expected string, received undefined") 대신 한글 메시지가 나오게 한다.
const yyyyMm = (label: string) =>
  z
    .string({ error: `${label}은(는) YYYY.MM 형식으로 입력해주세요` })
    .regex(YYYY_MM, `${label}은(는) YYYY.MM 형식으로 입력해주세요`);
const yyyyMmDd = (label: string) =>
  z
    .string({ error: `${label}은(는) YYYY.MM.DD 형식으로 입력해주세요` })
    .regex(YYYY_MM_DD, `${label}은(는) YYYY.MM.DD 형식으로 입력해주세요`);
const required = (label: string) =>
  z
    .string({ error: `${label}을(를) 입력해주세요` })
    .trim()
    .min(1, `${label}을(를) 입력해주세요`);

export const basicInfoSchema = z.object({
  name: required("이름"),
  email: z
    .string({ error: "이메일 형식이 올바르지 않아요" })
    .email("이메일 형식이 올바르지 않아요"),
  phoneNumber: z
    .string({ error: "010-0000-0000 형식으로 입력해주세요" })
    .regex(PHONE, "010-0000-0000 형식으로 입력해주세요"),
  profileImage: z.string().optional(),
});

export const summarySchema = z.object({
  title: required("제목"),
  content: required("상세 내용"),
});

export const introductionSchema = z.object({
  title: required("제목"),
  content: required("상세 내용"),
});

export const careerSchema = z.object({
  companyName: required("회사명"),
  department: required("근무부서"),
  jobTitle: required("직무"),
  position: required("직급/직책"),
  employmentType: z.enum(["FULL_TIME", "CONTRACT", "INTERN", "FREELANCER"], {
    message: "재직 형태를 선택해주세요",
  }),
  startDate: yyyyMm("입사년월"),
  endDate: yyyyMm("퇴사년월"),
  achievements: required("주요 성과"),
});

export const projectSchema = z.object({
  projectName: required("프로젝트명"),
  startDate: yyyyMmDd("시작일"),
  endDate: yyyyMmDd("종료일"),
  contribution: z.number().optional(),
  techStacks: z.array(z.string()).optional(),
  problemSolving: z.string().optional(),
  link: z.string().optional(),
});

export const skillSchema = z.object({
  skillName: required("기술스택명"),
  proficiency: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  usageScope: required("활용범위"),
});

const collegeEducationSchema = z.object({
  educationLevel: z.literal("COLLEGE_OR_ABOVE"),
  universityType: z.enum(["BACHELORS", "ASSOCIATE", "MASTERS", "DOCTORATE"], {
    message: "대학 구분을 선택해주세요",
  }),
  schoolName: required("학교명"),
  major: required("전공"),
  graduationStatus: z.enum(
    [
      "GRADUATED",
      "ENROLLED",
      "ON_LEAVE",
      "EXPECTED_GRADUATION",
      "DROPPED_OUT",
      "COMPLETED",
    ],
    { message: "졸업 여부를 선택해주세요" }
  ),
  startDate: yyyyMm("입학년월"),
  endDate: yyyyMm("졸업년월"),
  doubleMajor: z.string().optional(),
  majorType: z.enum(["DOUBLE_MAJOR", "MINOR"]).optional(),
  gpa: z.number().optional(),
  gpaMax: z.number().optional(),
  isTransfer: z.boolean().optional(),
});

const highSchoolEducationSchema = z
  .object({
    educationLevel: z.literal("HIGH_SCHOOL"),
    isGed: z.boolean().optional(),
    schoolName: z.string().optional(),
    graduationStatus: z
      .enum(["GRADUATED", "ENROLLED", "EXPECTED_GRADUATION", "DROPPED_OUT"])
      .optional(),
    majorField: z
      .enum(["GENERAL", "SPECIALIZED_SCIENCE_FOREIGN", "VOCATIONAL_MEISTER"])
      .optional(),
    major: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    // 검정고시가 아니면 학교명·졸업여부 필수 (BE validateHighSchoolEducation 미러)
    if (!v.isGed) {
      if (!v.schoolName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["schoolName"],
          message: "학교명을 입력해주세요",
        });
      }
      if (!v.graduationStatus) {
        ctx.addIssue({
          code: "custom",
          path: ["graduationStatus"],
          message: "졸업 여부를 선택해주세요",
        });
      }
    }
  });

const otherEducationSchema = z.object({
  educationLevel: z.literal("OTHER"),
  educationType: required("학력 유형"),
  institutionName: required("기관명"),
  completed: z.enum(["COMPLETED", "IN_PROGRESS", "DISCONTINUED"], {
    message: "이수 여부를 선택해주세요",
  }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const educationSchema = z.discriminatedUnion("educationLevel", [
  collegeEducationSchema,
  highSchoolEducationSchema,
  otherEducationSchema,
]);

export const certificateSchema = z
  .object({
    certificateType: z.enum(
      ["AWARD_CONTEST", "CERTIFICATE", "LANGUAGE", "OTHER"],
      {
        message: "수상·자격 구분을 선택해주세요",
      }
    ),
    name: required("수상·자격증명"),
    issuedDate: yyyyMm("수상·취득일"),
    issuer: required("수여·발급 기관"),
    scoreGrade: z.string().optional(),
    category: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.certificateType === "OTHER" && !v.category?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["category"],
        message: "구분을 입력해주세요",
      });
    }
  });

export const activitySchema = z.object({
  activityType: z.enum(
    [
      "SCHOOL_ACTIVITY",
      "EXTERNAL_ACTIVITY",
      "INTERN",
      "EDUCATION_TRAINING",
      "OTHER",
    ],
    { message: "활동 구분을 선택해주세요" }
  ),
  activityName: required("활동명"),
  organizationName: required("기관/장소명"),
  startDate: yyyyMm("시작년월"),
  endDate: yyyyMm("종료년월"),
  description: required("경험/활동 내역"),
});

export const BLOCK_CONTENT_SCHEMAS = {
  BASIC_INFO: basicInfoSchema,
  SUMMARY: summarySchema,
  INTRODUCTION: introductionSchema,
  CAREER: careerSchema,
  PROJECT: projectSchema,
  SKILL: skillSchema,
  EDUCATION: educationSchema,
  CERTIFICATE: certificateSchema,
  ACTIVITY: activitySchema,
} as const;

export type EditorBlockType = keyof typeof BLOCK_CONTENT_SCHEMAS;

export type BlockContentOf<T extends EditorBlockType> = z.infer<
  (typeof BLOCK_CONTENT_SCHEMAS)[T]
>;
