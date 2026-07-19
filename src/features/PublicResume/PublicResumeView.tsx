"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  API_CLIENT_PUBLIC_FEEDBACK,
  API_CLIENT_PUBLIC_RESUME,
  API_CLIENT_PUBLIC_VIEW_SESSION,
} from "@/entities/resumes/public/api/api.client.resumes.public";
import {
  OVERALL_FEEDBACK_TAGS,
  RATING_STEPS,
  SECTION_FEEDBACK_TAGS,
} from "@/entities/resumes/public/model/feedbackTags";
import { BLOCK_TYPE_LABELS } from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";
import { ResumePreview } from "@/features/ResumeBuilder/preview";

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

/** 1회 제출 제한 — 브라우저(localStorage) 기준 (서버 미강제 결정사항) */
const submittedKey = (resumeId: number, section: string) =>
  `resumate:feedback:${resumeId}:${section}`;

export default function PublicResumeView({ slug }: { slug: string }) {
  const { data: resume, isError } = useQuery({
    queryKey: ["publicResume", slug],
    queryFn: () => API_CLIENT_PUBLIC_RESUME(slug),
    retry: false,
  });

  const sections = useMemo(
    () =>
      SECTION_ORDER.map((type) => ({
        type,
        blocks: (resume?.blocks ?? [])
          .filter((b) => b.type === type)
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((b) => ({
            id: b.blockId,
            content: parseContent(b.contentJson),
          })),
      })).filter((s) => s.blocks.length > 0),
    [resume]
  );

  useViewTracking(
    slug,
    !!resume,
    sections.map((s) => s.type)
  );

  if (isError) {
    // 탈퇴·비공개·삭제 — 존재를 구분하지 않고 동일 안내 (기획: "삭제된 이력서" 안내)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-body-1-normal-medium text-label-alternative">
          삭제되었거나 열람할 수 없는 이력서예요
        </p>
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-label-1-normal-medium text-label-alternative">
          불러오는 중…
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-[24px] p-[32px] sm:grid-cols-[minmax(0,1fr)_320px] print:block print:p-0">
      <article>
        <h1 className="text-heading-1-bold mb-[16px] print:hidden">
          {resume.title}
        </h1>
        {/* 템플릿 렌더러가 섹션마다 data-section 을 달아 체류 계측이 동작한다 */}
        <ResumePreview sections={sections} template={resume.template} />
      </article>

      {/* 우측 사이드바 — 섹션별·전체 피드백 (기획: 사이드바 고정 노출) */}
      <FeedbackSidebar
        resumeId={resume.id}
        presentSections={sections.map((s) => s.type)}
      />
    </main>
  );
}

/** 열람 세션 시작 + 체류시간 계측 (IntersectionObserver 로 보이는 섹션 1초 단위 누적) */
function useViewTracking(
  slug: string,
  ready: boolean,
  sectionTypes: EditorBlockType[]
) {
  const sessionIdRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const dwellRef = useRef<Record<string, number>>({});
  const visibleRef = useRef<Set<string>>(new Set());
  const sectionsKey = sectionTypes.join(",");

  useEffect(() => {
    if (!ready) return;
    let disposed = false;

    API_CLIENT_PUBLIC_VIEW_SESSION(slug)
      .then((s) => {
        if (!disposed) sessionIdRef.current = s.sessionId;
      })
      .catch(() => undefined);

    startRef.current = Date.now();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute("data-section");
          if (!section) return;
          if (entry.isIntersecting) visibleRef.current.add(section);
          else visibleRef.current.delete(section);
        });
      },
      { threshold: 0.4 }
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));

    const tick = window.setInterval(() => {
      visibleRef.current.forEach((section) => {
        dwellRef.current[section] = (dwellRef.current[section] ?? 0) + 1;
      });
    }, 1000);

    const report = () => {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;
      const payload: API_CLIENT_VIEW_DURATION_PARAMS = {
        slug,
        sessionId,
        totalDurationSec: Math.round((Date.now() - startRef.current) / 1000),
        sectionDwells: Object.entries(dwellRef.current).map(
          ([section, dwellSeconds]) => ({
            section: section as BLOCK_TYPE,
            dwellSeconds,
          })
        ),
      };
      navigator.sendBeacon(
        "/api/public/view-duration",
        JSON.stringify(payload)
      );
    };
    window.addEventListener("pagehide", report);

    return () => {
      disposed = true;
      window.clearInterval(tick);
      observer.disconnect();
      window.removeEventListener("pagehide", report);
      report();
    };
  }, [slug, ready, sectionsKey]);
}

function FeedbackSidebar({
  resumeId,
  presentSections,
}: {
  resumeId: number;
  presentSections: EditorBlockType[];
}) {
  const [target, setTarget] = useState<EditorBlockType | "OVERALL">("OVERALL");
  const [rating, setRating] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const targetKey = target === "OVERALL" ? "overall" : target;
  const alreadySubmitted =
    typeof window !== "undefined" &&
    window.localStorage.getItem(submittedKey(resumeId, targetKey)) === "1";

  const availableTags =
    target === "OVERALL"
      ? OVERALL_FEEDBACK_TAGS
      : (SECTION_FEEDBACK_TAGS[target] ?? []);

  const submit = useMutation({
    mutationFn: () =>
      API_CLIENT_PUBLIC_FEEDBACK({
        resumeId,
        section: target === "OVERALL" ? null : target,
        rating,
        comment: target === "OVERALL" && comment.trim() ? comment.trim() : null,
        tags,
      }),
    onMutate: () => setSubmitError(null),
    onSuccess: () => {
      window.localStorage.setItem(submittedKey(resumeId, targetKey), "1");
      setDone(true);
    },
    onError: async (err) => {
      // BFF 가 BE 실패 사유(본인 이력서·유효성 등)를 message 로 전달한다
      const body = await (err as { response?: Response }).response
        ?.json()
        .catch(() => null);
      setSubmitError(
        (body as { message?: string } | null)?.message ??
          "피드백을 제출하지 못했어요. 잠시 후 다시 시도해주세요."
      );
    },
  });

  const changeTarget = (next: EditorBlockType | "OVERALL") => {
    setTarget(next);
    setRating(null);
    setTags([]);
    setComment("");
    setDone(false);
    setSubmitError(null);
  };

  const canSubmit =
    rating !== null ||
    tags.length > 0 ||
    (target === "OVERALL" && !!comment.trim());

  return (
    <aside className="border-line-normal-normal sticky top-[24px] flex h-fit flex-col gap-[14px] rounded-[16px] border p-[20px] print:hidden">
      <h3 className="text-heading-2-bold">피드백 남기기</h3>

      <div className="flex flex-wrap gap-[4px]">
        <button
          type="button"
          onClick={() => changeTarget("OVERALL")}
          className={`text-label-2-medium h-[28px] rounded-[8px] border px-[8px] ${
            target === "OVERALL"
              ? "border-primary-normal bg-primary-normal text-white"
              : "border-line-normal-normal text-label-normal"
          }`}
        >
          전체
        </button>
        {presentSections
          .filter((s) => s !== "BASIC_INFO")
          .map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => changeTarget(section)}
              className={`text-label-2-medium h-[28px] rounded-[8px] border px-[8px] ${
                target === section
                  ? "border-primary-normal bg-primary-normal text-white"
                  : "border-line-normal-normal text-label-normal"
              }`}
            >
              {BLOCK_TYPE_LABELS[section]}
            </button>
          ))}
      </div>

      {done || alreadySubmitted ? (
        <p className="text-label-1-normal-medium text-label-alternative">
          이미 피드백을 남겼어요. 고마워요!
        </p>
      ) : (
        <>
          {/* 별점 0.5 단위 */}
          <div className="flex flex-col gap-[6px]">
            <span className="text-label-1-normal-medium">별점</span>
            <div className="flex flex-wrap gap-[4px]">
              {RATING_STEPS.map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setRating(rating === step ? null : step)}
                  className={`text-label-2-medium h-[28px] rounded-[6px] border px-[6px] ${
                    rating === step
                      ? "border-[#f59e0b] bg-[#fef3c7] text-[#b45309]"
                      : "border-line-normal-normal text-label-normal"
                  }`}
                >
                  {step.toFixed(1)}
                </button>
              ))}
            </div>
          </div>

          {availableTags.length > 0 && (
            <div className="flex flex-col gap-[6px]">
              <span className="text-label-1-normal-medium">태그</span>
              <div className="flex flex-wrap gap-[4px]">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      )
                    }
                    className={`text-label-2-medium rounded-[6px] border px-[8px] py-[3px] ${
                      tags.includes(tag)
                        ? "border-primary-normal bg-[#f0f4ff] text-[#0066FF]"
                        : "border-line-normal-normal text-label-normal"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {target === "OVERALL" && (
            <textarea
              className="border-line-normal-normal text-label-1-normal-medium min-h-[80px] rounded-[8px] border p-[10px]"
              placeholder="이력서 전체에 대한 의견을 남겨주세요 (선택)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}

          <button
            type="button"
            disabled={!canSubmit || submit.isPending}
            onClick={() => submit.mutate()}
            className="h-[40px] rounded-[10px] bg-[#0066FF] font-[600] text-white disabled:opacity-40"
          >
            피드백 제출
          </button>

          {submitError && (
            <p className="text-label-2-medium text-[#dc2626]">{submitError}</p>
          )}
        </>
      )}
    </aside>
  );
}
