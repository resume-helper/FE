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

/** 미리보기용 요약 — contentJson 에서 대표 필드를 뽑는다 */
function summarize(type: EditorBlockType, content: Record<string, unknown>) {
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

/** 실시간 미리보기 (기획 9.5.4) — 템플릿 3종 레이아웃 분기 */
export function ResumePreview({
  sections,
  template,
}: {
  sections: PreviewSection[];
  template: ResumeTemplate;
}) {
  const filled = sections.filter((s) => s.blocks.length > 0);

  const renderSection = (section: PreviewSection) => (
    <section
      key={section.type}
      className={template === "C" ? "border-b border-[#e5e5e5] pb-[12px]" : ""}
    >
      <h4
        className={
          template === "A"
            ? "text-heading-2-bold mb-[8px]"
            : template === "B"
              ? "text-heading-2-bold mb-[8px] text-[#2563eb]"
              : "text-body-1-normal-bold mb-[8px] tracking-widest uppercase"
        }
      >
        {BLOCK_TYPE_LABELS[section.type]}
      </h4>
      <ul className="flex flex-col gap-[10px]">
        {section.blocks.map((b) => {
          const line = summarize(section.type, b.content);
          return (
            <li key={b.id}>
              <p className="text-body-1-normal-bold">{line.title}</p>
              {line.subtitle && (
                <p className="text-label-1-normal-medium text-label-alternative">
                  {line.subtitle}
                </p>
              )}
              {line.body && (
                <p className="text-label-1-normal-medium mt-[4px] whitespace-pre-line">
                  {line.body}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );

  if (filled.length === 0) {
    return (
      <p className="text-label-1-normal-medium text-label-alternative">
        블록을 추가하면 미리보기가 표시돼요
      </p>
    );
  }

  if (template === "B") {
    const left = filled.filter(
      (s) => s.type === "BASIC_INFO" || s.type === "SKILL"
    );
    const right = filled.filter(
      (s) => s.type !== "BASIC_INFO" && s.type !== "SKILL"
    );
    return (
      <div className="grid grid-cols-[1fr_2fr] gap-[24px]">
        <div className="flex flex-col gap-[20px]">
          {left.map(renderSection)}
        </div>
        <div className="flex flex-col gap-[20px]">
          {right.map(renderSection)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px]">{filled.map(renderSection)}</div>
  );
}
