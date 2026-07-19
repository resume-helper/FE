"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  API_CLIENT_RESUMES_DELETE,
  API_CLIENT_RESUMES_DETAIL,
} from "@/entities/resumes/detail/api/api.client.resumes.detail";
import { API_CLIENT_RESUMES_VISIBILITY } from "@/entities/resumes/builder/api/api.client.resumes.builder";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";
import { ResumePreview } from "@/features/ResumeBuilder/preview";
import { useAlertStore } from "@/shared/store/alertStore";

import { FeedbackReport } from "./FeedbackReport";

const SECTION_ORDER: EditorBlockType[] = [
  "BASIC_INFO",
  "SUMMARY",
  "INTRODUCTION",
  "SKILL",
  "CAREER",
  "PROJECT",
  "EDUCATION",
  "ACTIVITY",
  "CERTIFICATE",
];

function parseContent(contentJson: string): Record<string, unknown> {
  try {
    return JSON.parse(contentJson) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function ResumeDetailView({
  mode,
  resumeId,
}: {
  mode: RESUMSES_TYPES;
  resumeId: number;
}) {
  const router = useRouter();
  const showAlert = useAlertStore((s) => s.show);
  const [tab, setTab] = useState<"content" | "feedback">("content");
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  const listPath = mode === "PDF" ? "/r/resumes/pdf" : "/r/resumes/web";

  const { data: detail, isLoading } = useQuery({
    queryKey: ["resumeDetail", resumeId],
    queryFn: () => API_CLIENT_RESUMES_DETAIL(resumeId),
  });

  const publicState = isPublic ?? detail?.isPublic ?? false;
  const shareUrl =
    detail?.slug && typeof window !== "undefined"
      ? `${window.location.origin}/w/${detail.slug}`
      : null;

  const sections = useMemo(
    () =>
      SECTION_ORDER.map((type) => ({
        type,
        blocks: (detail?.blocks ?? [])
          .filter((b) => b.type === type)
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((b) => ({
            id: b.blockId,
            content: parseContent(b.contentJson),
          })),
      })),
    [detail]
  );

  const toggleVisibility = useMutation({
    mutationFn: (next: boolean) =>
      API_CLIENT_RESUMES_VISIBILITY({ resumeId, isPublic: next }),
    onSuccess: (result) => setIsPublic(result.isPublic),
  });

  const remove = useMutation({
    mutationFn: () => API_CLIENT_RESUMES_DELETE([resumeId]),
    onSuccess: () => router.push(listPath),
  });

  const onDeleteClick = async () => {
    const result = await showAlert({
      title: "이력서를 삭제할까요?",
      content: "삭제 후 복구가 불가능해요.",
      confirm: { label: "삭제", variant: "negative" },
      cancel: { label: "취소" },
    });
    if (result === "confirm") remove.mutate();
  };

  if (isLoading || !detail) {
    return (
      <section className="text-label-1-normal-medium text-label-alternative p-[32px]">
        불러오는 중…
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-[960px] flex-col gap-[20px] p-[32px]">
      {/* 브레드크럼 (기획 6.1·7.1) */}
      <nav className="text-label-2-medium text-label-alternative print:hidden">
        <Link href="/r">이력서</Link>
        {" > "}
        <Link href={listPath}>{mode === "PDF" ? "PDF" : "웹"} 이력서 목록</Link>
        {" > "}
        <span className="text-label-normal">상세</span>
      </nav>

      <div className="flex items-center justify-between gap-[12px] print:hidden">
        <div className="flex items-center gap-[8px]">
          <h2 className="text-heading-1-bold">{detail.title}</h2>
          {mode === "WEB" && (
            <span
              className={`text-label-2-medium rounded-[6px] px-[8px] py-[2px] ${
                publicState
                  ? "bg-[#e6f4ea] text-[#16a34a]"
                  : "text-label-alternative bg-[#f0f0f2]"
              }`}
            >
              {publicState ? "공개중" : "비공개"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-[8px]">
          {mode === "PDF" && (
            <button
              type="button"
              onClick={() => window.print()}
              className="text-label-1-normal-medium h-[36px] rounded-[10px] bg-[#0066FF] px-[12px] text-white"
            >
              PDF 다운로드
            </button>
          )}
          {mode === "PDF" && detail.pdfDownloadUrl && (
            <a
              href={detail.pdfDownloadUrl}
              className="text-label-1-normal-medium h-[36px] rounded-[10px] border border-[#70737C29] px-[12px] leading-[36px] text-[#171719]"
            >
              재다운로드
            </a>
          )}
          {mode === "WEB" && (
            <>
              <button
                type="button"
                disabled={toggleVisibility.isPending}
                onClick={() => toggleVisibility.mutate(!publicState)}
                className={`text-label-1-normal-medium h-[36px] rounded-[10px] px-[12px] ${
                  publicState
                    ? "bg-[#0066FF] text-white"
                    : "text-label-normal bg-[#e5e5e5]"
                }`}
              >
                {publicState ? "공개" : "비공개"}
              </button>
              <button
                type="button"
                disabled={!publicState || !shareUrl}
                onClick={() =>
                  shareUrl && navigator.clipboard.writeText(shareUrl)
                }
                className="text-label-1-normal-medium h-[36px] rounded-[10px] border border-[#70737C29] px-[12px] text-[#171719] disabled:opacity-40"
              >
                링크 복사
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onDeleteClick}
            className="text-label-1-normal-medium h-[36px] rounded-[10px] border border-[#70737C29] px-[12px] text-[#dc2626]"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 웹 이력서 — 상세/피드백 탭 (기획 8-1·8-2) */}
      {mode === "WEB" && (
        <div className="border-line-normal-normal flex gap-[4px] border-b print:hidden">
          <button
            type="button"
            onClick={() => setTab("content")}
            className={`text-body-1-normal-medium px-[16px] py-[10px] ${
              tab === "content"
                ? "border-primary-normal text-primary-normal border-b-2"
                : "text-label-alternative"
            }`}
          >
            이력서 내용
          </button>
          <button
            type="button"
            onClick={() => setTab("feedback")}
            className={`text-body-1-normal-medium px-[16px] py-[10px] ${
              tab === "feedback"
                ? "border-primary-normal text-primary-normal border-b-2"
                : "text-label-alternative"
            }`}
          >
            피드백 리포트
          </button>
        </div>
      )}

      {(mode === "PDF" || tab === "content") && (
        <div className="border-line-normal-normal rounded-[12px] border bg-white p-[24px] print:border-0 print:p-0">
          <ResumePreview sections={sections} template={detail.template} />
        </div>
      )}

      {mode === "WEB" && tab === "feedback" && (
        <FeedbackReport resumeId={resumeId} />
      )}
    </section>
  );
}
