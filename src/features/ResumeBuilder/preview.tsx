"use client";

import { BLOCK_TYPE_LABELS } from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";

export type ResumeTemplate = "A" | "B" | "C";

export const RESUME_TEMPLATES: {
  value: ResumeTemplate;
  label: string;
  description: string;
}[] = [
  { value: "A", label: "Template A", description: "클래식·심플" },
  { value: "B", label: "Template B", description: "모던·두 컬럼" },
  { value: "C", label: "Template C", description: "미니멀·라인" },
];

/** 미리보기용 요약 — contentJson 에서 대표 필드를 뽑는다 (블록 카드 프리뷰에서 재사용) */
export function summarize(
  type: EditorBlockType,
  content: Record<string, unknown>
) {
  const s = (k: string) =>
    typeof content[k] === "string" ? (content[k] as string) : "";
  switch (type) {
    case "BASIC_INFO":
      return {
        title: s("name"),
        subtitle: [s("email"), s("phoneNumber")].filter(Boolean).join(" · "),
      };
    case "SUMMARY":
    case "INTRODUCTION":
      return { title: s("title"), body: s("content") };
    case "CAREER":
      return {
        title: s("companyName"),
        subtitle: [s("jobTitle"), `${s("startDate")} ~ ${s("endDate")}`]
          .filter(Boolean)
          .join(" · "),
        body: s("achievements"),
      };
    case "PROJECT":
      return {
        title: s("projectName"),
        subtitle: `${s("startDate")} ~ ${s("endDate")}`,
        body: s("problemSolving"),
      };
    case "SKILL":
      return { title: s("skillName"), body: s("usageScope") };
    case "EDUCATION":
      return {
        title: s("schoolName") || s("institutionName"),
        subtitle: [s("major"), `${s("startDate")} ~ ${s("endDate")}`]
          .filter(Boolean)
          .join(" · "),
      };
    case "CERTIFICATE":
      return {
        title: s("name"),
        subtitle: [s("issuer"), s("issuedDate")].filter(Boolean).join(" · "),
      };
    case "ACTIVITY":
      return {
        title: s("activityName"),
        subtitle: [s("organizationName"), `${s("startDate")} ~ ${s("endDate")}`]
          .filter(Boolean)
          .join(" · "),
        body: s("description"),
      };
  }
}

export type PreviewSection = {
  type: EditorBlockType;
  blocks: { id: number; content: Record<string, unknown> }[];
};

// ── 필드 라벨 (BE enum → 한글) ────────────────────────────────────────────────

const EMPLOYMENT_LABELS: Record<string, string> = {
  FULL_TIME: "정규직",
  CONTRACT: "계약직",
  INTERN: "인턴",
  FREELANCER: "프리랜서",
};

const PROFICIENCY_LABELS: Record<string, string> = {
  LOW: "하",
  MEDIUM: "중",
  HIGH: "상",
};

const UNIVERSITY_LABELS: Record<string, string> = {
  BACHELORS: "학사",
  ASSOCIATE: "전문학사",
  MASTERS: "석사",
  DOCTORATE: "박사",
};

const GRADUATION_LABELS: Record<string, string> = {
  GRADUATED: "졸업",
  ENROLLED: "재학",
  ON_LEAVE: "휴학",
  EXPECTED_GRADUATION: "졸업예정",
  DROPPED_OUT: "중퇴",
  COMPLETED: "수료",
};

const COMPLETED_LABELS: Record<string, string> = {
  COMPLETED: "수료",
  IN_PROGRESS: "진행 중",
  DISCONTINUED: "중단",
};

const CERTIFICATE_TYPE_LABELS: Record<string, string> = {
  AWARD_CONTEST: "수상",
  CERTIFICATE: "자격증",
  LANGUAGE: "어학",
  OTHER: "기타",
};

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  SCHOOL_ACTIVITY: "교내활동",
  EXTERNAL_ACTIVITY: "대외활동",
  INTERN: "인턴",
  EDUCATION_TRAINING: "교육/연수",
  OTHER: "기타",
};

/** 템플릿 C 전용 섹션 라벨 (미니멀·라인 — 영문 대문자 트래킹) */
const C_SECTION_LABELS: Record<EditorBlockType, string> = {
  BASIC_INFO: "Profile",
  SUMMARY: "Summary",
  INTRODUCTION: "About",
  CAREER: "Career",
  SKILL: "Skills",
  PROJECT: "Projects",
  EDUCATION: "Education",
  CERTIFICATE: "Awards & Certificates",
  ACTIVITY: "Activities",
};

// ── contentJson 필드 접근 헬퍼 ────────────────────────────────────────────────

const str = (c: Record<string, unknown>, k: string) =>
  typeof c[k] === "string" ? (c[k] as string) : "";
const num = (c: Record<string, unknown>, k: string) =>
  typeof c[k] === "number" ? (c[k] as number) : null;
const strArr = (c: Record<string, unknown>, k: string) =>
  Array.isArray(c[k])
    ? (c[k] as unknown[]).filter((v): v is string => typeof v === "string")
    : [];

const period = (c: Record<string, unknown>) =>
  [str(c, "startDate"), str(c, "endDate")].filter(Boolean).join(" ~ ");

/** 블록 한 개를 공통 표시 모델로 변환 — 템플릿은 이걸 각자의 마크업으로 렌더한다 */
type BlockView = {
  title: string;
  meta: string;
  period: string;
  body: string;
  chips: string[];
  link: string;
};

function toBlockView(
  type: EditorBlockType,
  c: Record<string, unknown>
): BlockView {
  const empty: BlockView = {
    title: "",
    meta: "",
    period: "",
    body: "",
    chips: [],
    link: "",
  };
  switch (type) {
    case "BASIC_INFO":
      return {
        ...empty,
        title: str(c, "name"),
        meta: [str(c, "email"), str(c, "phoneNumber")]
          .filter(Boolean)
          .join(" / "),
      };
    case "SUMMARY":
    case "INTRODUCTION":
      return { ...empty, title: str(c, "title"), body: str(c, "content") };
    case "CAREER":
      return {
        ...empty,
        title: str(c, "companyName"),
        meta: [
          str(c, "department"),
          str(c, "jobTitle"),
          str(c, "position"),
          EMPLOYMENT_LABELS[str(c, "employmentType")] ?? "",
        ]
          .filter(Boolean)
          .join(" · "),
        period: period(c),
        body: str(c, "achievements"),
      };
    case "PROJECT": {
      const contribution = num(c, "contribution");
      return {
        ...empty,
        title: str(c, "projectName"),
        meta: contribution !== null ? `기여도 ${contribution}%` : "",
        period: period(c),
        body: str(c, "problemSolving"),
        chips: strArr(c, "techStacks"),
        link: str(c, "link"),
      };
    }
    case "SKILL":
      return {
        ...empty,
        title: str(c, "skillName"),
        meta: PROFICIENCY_LABELS[str(c, "proficiency")] ?? "",
        body: str(c, "usageScope"),
      };
    case "EDUCATION": {
      const level = str(c, "educationLevel");
      if (level === "OTHER") {
        return {
          ...empty,
          title: str(c, "institutionName"),
          meta: [
            str(c, "educationType"),
            COMPLETED_LABELS[str(c, "completed")] ?? "",
          ]
            .filter(Boolean)
            .join(" · "),
          period: period(c),
        };
      }
      if (level === "HIGH_SCHOOL") {
        return {
          ...empty,
          title:
            c["isGed"] === true ? "고등학교 검정고시" : str(c, "schoolName"),
          meta: [
            str(c, "major"),
            GRADUATION_LABELS[str(c, "graduationStatus")] ?? "",
          ]
            .filter(Boolean)
            .join(" · "),
          period: period(c),
        };
      }
      const gpa = num(c, "gpa");
      const gpaMax = num(c, "gpaMax");
      return {
        ...empty,
        title: str(c, "schoolName"),
        meta: [
          [str(c, "major"), UNIVERSITY_LABELS[str(c, "universityType")] ?? ""]
            .filter(Boolean)
            .join(" "),
          GRADUATION_LABELS[str(c, "graduationStatus")] ?? "",
          gpa !== null
            ? `학점 ${gpa}${gpaMax !== null ? `/${gpaMax}` : ""}`
            : "",
        ]
          .filter(Boolean)
          .join(" · "),
        period: period(c),
      };
    }
    case "CERTIFICATE":
      return {
        ...empty,
        title: str(c, "name"),
        meta: [
          CERTIFICATE_TYPE_LABELS[str(c, "certificateType")] ?? "",
          str(c, "issuer"),
          str(c, "scoreGrade"),
        ]
          .filter(Boolean)
          .join(" · "),
        period: str(c, "issuedDate"),
      };
    case "ACTIVITY":
      return {
        ...empty,
        title: str(c, "activityName"),
        meta: [
          ACTIVITY_TYPE_LABELS[str(c, "activityType")] ?? "",
          str(c, "organizationName"),
        ]
          .filter(Boolean)
          .join(" · "),
        period: period(c),
        body: str(c, "description"),
      };
  }
}

// ── 공통 파생 ─────────────────────────────────────────────────────────────────

function splitSections(sections: PreviewSection[]) {
  const filled = sections.filter((s) => s.blocks.length > 0);
  const basic = filled.find((s) => s.type === "BASIC_INFO")?.blocks[0];
  const rest = filled.filter((s) => s.type !== "BASIC_INFO");
  return {
    header: basic ? toBlockView("BASIC_INFO", basic.content) : null,
    rest,
    filled,
  };
}

function TechChips({
  chips,
  className,
}: {
  chips: string[];
  className: string;
}) {
  if (chips.length === 0) return null;
  return (
    <span className="mt-[4px] flex flex-wrap gap-[4px]">
      {chips.map((chip) => (
        <span key={chip} className={className}>
          {chip}
        </span>
      ))}
    </span>
  );
}

function BlockLink({ link }: { link: string }) {
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="mt-[2px] block truncate text-[12.5px] text-[#2563eb] underline underline-offset-2"
    >
      {link}
    </a>
  );
}

/**
 * 실시간 미리보기·상세·외부열람 공용 풀 렌더 (기획 9.5.4 / 퍼블리싱 확정 시안 2026-07-19)
 * — 템플릿 3종 레이아웃 분기. 섹션 요소에 data-section 을 달아 외부열람
 *   체류 계측(IntersectionObserver)이 그대로 동작한다.
 */
export function ResumePreview({
  sections,
  template,
}: {
  sections: PreviewSection[];
  template: ResumeTemplate;
}) {
  const { filled } = splitSections(sections);
  if (filled.length === 0) {
    return (
      <p className="text-label-1-normal-medium text-label-alternative">
        블록을 추가하면 미리보기가 표시돼요
      </p>
    );
  }
  if (template === "B") return <TemplateB sections={sections} />;
  if (template === "C") return <TemplateC sections={sections} />;
  return <TemplateA sections={sections} />;
}

// ── Template A — 클래식·심플 (이름 헤더 + 굵은 구분선 + 좌라벨/우내용) ──────────

function TemplateA({ sections }: { sections: PreviewSection[] }) {
  const { header, rest } = splitSections(sections);
  return (
    <div className="text-[#191d24]">
      {header && (
        <header data-section="BASIC_INFO">
          <h2 className="text-[26px] font-[800] tracking-[-0.02em]">
            {header.title}
          </h2>
          {header.meta && (
            <p className="mt-[4px] text-[13px] font-[600] text-[#4b5260]">
              {header.meta}
            </p>
          )}
          <hr className="mt-[14px] border-0 border-t-[3px] border-[#191d24]" />
        </header>
      )}
      {rest.map((section) => (
        <section
          key={section.type}
          data-section={section.type}
          className="grid grid-cols-1 gap-x-[24px] gap-y-[6px] border-b border-[#e3e6ec] py-[12px] last:border-b-0 sm:grid-cols-[130px_minmax(0,1fr)]"
        >
          <h3 className="text-[15px] font-[800]">
            {BLOCK_TYPE_LABELS[section.type]}
          </h3>
          <ul className="flex min-w-0 flex-col gap-[9px]">
            {section.blocks.map((b) => {
              const v = toBlockView(section.type, b.content);
              return (
                <li key={b.id}>
                  <p className="text-[14px] font-[700]">
                    {v.title}
                    {v.period && (
                      <span className="ml-[8px] text-[12px] font-[500] text-[#8a91a0]">
                        {v.period}
                      </span>
                    )}
                  </p>
                  {v.meta && (
                    <p className="text-[12.5px] text-[#8a91a0]">{v.meta}</p>
                  )}
                  {v.body && (
                    <p className="mt-[3px] text-[13px] whitespace-pre-line text-[#4b5260]">
                      {v.body}
                    </p>
                  )}
                  <TechChips
                    chips={v.chips}
                    className="rounded-[4px] bg-[#f0f1f4] px-[6px] py-[1px] text-[11.5px] text-[#4b5260]"
                  />
                  <BlockLink link={v.link} />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

// ── Template B — 모던·두 컬럼 (틴트 사이드바 + 딥블루 포인트) ───────────────────

const B_SIDE_SECTIONS: EditorBlockType[] = [
  "SKILL",
  "EDUCATION",
  "CERTIFICATE",
];

function TemplateB({ sections }: { sections: PreviewSection[] }) {
  const { header, rest } = splitSections(sections);
  const side = rest.filter((s) => B_SIDE_SECTIONS.includes(s.type));
  const main = rest.filter((s) => !B_SIDE_SECTIONS.includes(s.type));

  const renderItems = (section: PreviewSection, compact: boolean) => (
    <ul
      className={`flex min-w-0 flex-col ${compact ? "gap-[6px]" : "gap-[9px]"}`}
    >
      {section.blocks.map((b) => {
        const v = toBlockView(section.type, b.content);
        return (
          <li
            key={b.id}
            className={
              compact ? "" : "border-l-[2px] border-[#d8e2f8] pl-[12px]"
            }
          >
            <p
              className={`font-[700] ${compact ? "text-[13px]" : "text-[14px]"}`}
            >
              {v.title}
            </p>
            {(v.meta || v.period) && (
              <p
                className={`text-[#8a91a0] ${compact ? "text-[11.5px]" : "text-[12.5px]"}`}
              >
                {[v.meta, v.period].filter(Boolean).join(" · ")}
              </p>
            )}
            {v.body && (
              <p
                className={`mt-[3px] whitespace-pre-line text-[#4b5260] ${
                  compact ? "text-[12px]" : "text-[13px]"
                }`}
              >
                {v.body}
              </p>
            )}
            <TechChips
              chips={v.chips}
              className="rounded-[4px] bg-[#e8eefb] px-[6px] py-[1px] text-[11.5px] text-[#2563eb]"
            />
            <BlockLink link={v.link} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[8px] text-[#191d24] sm:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-[16px] bg-[#f2f5fd] p-[24px]">
        {header && (
          <div data-section="BASIC_INFO">
            <h2 className="text-[21px] leading-[1.25] font-[800] tracking-[-0.02em]">
              {header.title}
            </h2>
            {header.meta && (
              <p className="mt-[8px] flex flex-col gap-[2px] text-[12px] text-[#4b5260]">
                {header.meta.split(" / ").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            )}
          </div>
        )}
        {side.map((section) => (
          <section key={section.type} data-section={section.type}>
            <h3 className="mb-[6px] text-[11.5px] font-[800] tracking-[0.09em] uppercase">
              {BLOCK_TYPE_LABELS[section.type]}
            </h3>
            {renderItems(section, true)}
          </section>
        ))}
      </aside>
      <main className="flex min-w-0 flex-col gap-[16px] p-[24px]">
        {main.map((section) => (
          <section key={section.type} data-section={section.type}>
            <h3 className="mb-[6px] text-[13px] font-[800] text-[#2563eb]">
              {BLOCK_TYPE_LABELS[section.type]}
            </h3>
            {renderItems(section, false)}
          </section>
        ))}
      </main>
    </div>
  );
}

// ── Template C — 미니멀·라인 (헤어라인 + 대문자 라벨 + 날짜 우측 정렬) ──────────

function TemplateC({ sections }: { sections: PreviewSection[] }) {
  const { header, rest } = splitSections(sections);
  return (
    <div className="text-[#191d24]">
      {header && (
        <header data-section="BASIC_INFO">
          <h2 className="text-[20px] font-[600] tracking-[0.01em]">
            {header.title}
          </h2>
          {header.meta && (
            <p className="mt-[4px] text-[12px] tracking-[0.02em] text-[#8a91a0]">
              {header.meta.replace(" / ", " · ")}
            </p>
          )}
        </header>
      )}
      <div className="mt-[14px] border-t border-[#191d24]">
        {rest.map((section) => (
          <section
            key={section.type}
            data-section={section.type}
            className="border-b border-[#e3e6ec] py-[12px] last:border-b-0"
          >
            <h3 className="mb-[7px] text-[10.5px] font-[700] tracking-[0.22em] text-[#8a91a0] uppercase">
              {C_SECTION_LABELS[section.type]}
            </h3>
            <ul className="flex flex-col gap-[9px]">
              {section.blocks.map((b) => {
                const v = toBlockView(section.type, b.content);
                return (
                  <li
                    key={b.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-[20px]"
                  >
                    <p className="text-[13.5px] font-[600]">
                      {v.title}
                      {v.meta && (
                        <span className="ml-[6px] text-[12px] font-[400] text-[#8a91a0]">
                          {v.meta}
                        </span>
                      )}
                    </p>
                    {v.period && (
                      <p className="text-[11.5px] whitespace-nowrap text-[#8a91a0] tabular-nums">
                        {v.period.replace(" ~ ", " — ")}
                      </p>
                    )}
                    {v.body && (
                      <p className="col-span-full mt-[2px] text-[12.5px] whitespace-pre-line text-[#4b5260]">
                        {v.body}
                      </p>
                    )}
                    <TechChips
                      chips={v.chips}
                      className="text-[11.5px] text-[#4b5260] before:content-['#']"
                    />
                    <BlockLink link={v.link} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
