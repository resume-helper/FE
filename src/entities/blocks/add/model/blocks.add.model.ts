import z from "zod";

export const BlocksDefault = {
  blockType: z.enum(
    [
      "BASIC_INFO",
      "CAREER",
      "SKILL",
      "PROJECT",
      "EDUCATION",
      "CERTIFICATE",
      "ACTIVITY",
      "INTRODUCTION",
      "SUMMARY",
    ],
    {
      error: "블록타입이 올바르지 않습니다.",
    }
  ),
  title: z.string().trim().min(1, "블록명을 입력해주세요."),
};

export const CareerBlocks = z.array(
  z.object({
    ...BlocksDefault,
    contentJson: z.object({
      /** 회사명 */
      companyName: z.string().trim().min(1, "회사명을 입력해주세요."),

      /** 근무부서 */
      department: z.string().trim().min(1, "근무부서를 입력해주세요."),

      /** 직무 */
      jobTitle: z.string().trim().min(1, "직무를 입력해주세요."),

      /** 직급/직책 */
      position: z.string().trim().min(1, "직급/직책을 입력해주세요."),

      /** 재직형태
       * FULL_TIME : 정규직,
       * CONTRACT : 계약직
       * INTERN : 인턴
       * FREELANCER : 프리랜서
       *  */
      employmentType: z.enum(
        ["FULL_TIME", "CONTRACT", "INTERN", "FREELANCER", ""],
        { error: "재직형태가 올바르지않습니다." }
      ),

      /** 시작날짜 */
      startDate: z.string().transform((value) => value.replace("-", ".")),

      /** 종료날짜 */
      endDate: z.string().transform((value) => value.replace("-", ".")),

      /** 주요성과 */
      achievements: z.string().trim().min(1, "주요성과를 입력해주세요."),
    }),
  })
);

export const BasicInfoBlocks = z.array(
  z.object({
    ...BlocksDefault,
    contentJson: z.object({
      name: z.string().min(1, "이름을 입력해주세요."),
      email: z
        .string()
        .min(1, "이메일을 입력해주세요.")
        .regex(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "올바른 이메일 형식을 입력해주세요."
        ),
      phoneNumber: z
        .string()
        .trim()
        .min(1, "휴대폰 번호를 입력해주세요.")
        .regex(
          /^01[016789]-\d{3,4}-\d{4}$/,
          "올바른 휴대폰 번호 형식을 입력해주세요. (예: 010-1234-5678)"
        ),
      profileImage: z.string().optional(),
    }),
  })
);

/** 기본정보 블록 폼 스키마 */
export const BasicInfoBlocksSchema = z.object({
  blocks: BasicInfoBlocks,
});

/** 경력 블록 폼 스키마 */
export const CareerBlocksSchema = z.object({
  blocks: CareerBlocks,
});
