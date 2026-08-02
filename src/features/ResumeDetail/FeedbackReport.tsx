"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  API_CLIENT_RESUMES_ANALYTICS,
  API_CLIENT_RESUMES_FEEDBACKS,
  API_CLIENT_RESUMES_FEEDBACK_STATS,
} from "@/entities/resumes/detail/api/api.client.resumes.detail";
import {
  BLOCK_EDITOR_TYPES,
  BLOCK_TYPE_LABELS,
} from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";

const FEEDBACK_PAGE_SIZE = 50;

function formatSec(sec: number | null | undefined) {
  if (sec == null) return "-";
  return `${Math.round(sec)}초`;
}

/** 최근 7일 대 이전 7일 증감 (기획 7.8.1) */
function Delta({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) return null;
  const diff = current - previous;
  if (diff === 0)
    return (
      <span
        title="최근 7일 대비 이전 7일 변화"
        className="text-label-2-medium text-label-alternative"
      >
        -
      </span>
    );
  return (
    <span
      title="최근 7일 대비 이전 7일 변화"
      className={`text-label-2-medium ${diff > 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}
    >
      {diff > 0 ? "▲" : "▼"} {Math.abs(Math.round(diff * 10) / 10)}
    </span>
  );
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating == null) return null;
  return (
    <span className="text-label-1-normal-medium text-[#f59e0b]">
      ★ {rating.toFixed(1)}
    </span>
  );
}

/** 피드백 리포트 탭 (기획 8-2) */
export function FeedbackReport({ resumeId }: { resumeId: number }) {
  const [sectionTab, setSectionTab] = useState<EditorBlockType | "OVERALL">(
    "OVERALL"
  );

  const { data: analytics } = useQuery({
    queryKey: ["resumeAnalytics", resumeId],
    queryFn: () => API_CLIENT_RESUMES_ANALYTICS(resumeId),
  });
  const { data: stats } = useQuery({
    queryKey: ["resumeFeedbackStats", resumeId],
    queryFn: () => API_CLIENT_RESUMES_FEEDBACK_STATS(resumeId),
  });
  const { data: feedbackPage } = useQuery({
    queryKey: ["resumeFeedbacks", resumeId],
    queryFn: () =>
      API_CLIENT_RESUMES_FEEDBACKS(resumeId, 1, FEEDBACK_PAGE_SIZE),
  });

  const feedbacks = feedbackPage?.content ?? [];
  const maxDwell = Math.max(
    ...(analytics?.sectionDwells.map((d) => d.averageDwellSec) ?? [0]),
    1
  );

  const visible =
    sectionTab === "OVERALL"
      ? feedbacks.filter((f) => f.section === null)
      : feedbacks.filter((f) => f.section === sectionTab);

  const sectionCount = (type: EditorBlockType) =>
    stats?.sections.find((s) => s.section === type)?.count ?? 0;

  return (
    <div className="flex flex-col gap-[24px]">
      {/* ① 데이터 요약 카드 */}
      <div className="grid grid-cols-3 gap-[12px]">
        <div className="border-line-normal-normal flex flex-col gap-[4px] rounded-[12px] border p-[16px]">
          <span className="text-label-2-medium text-label-alternative">
            전체 열람 수
          </span>
          <span className="text-heading-1-bold">
            {analytics?.totalViews ?? "-"}
          </span>
          {analytics && (
            <Delta
              current={analytics.last7Days.viewCount}
              previous={analytics.previous7Days.viewCount}
            />
          )}
        </div>
        <div className="border-line-normal-normal flex flex-col gap-[4px] rounded-[12px] border p-[16px]">
          <span className="text-label-2-medium text-label-alternative">
            평균 체류시간
          </span>
          <span className="text-heading-1-bold">
            {formatSec(analytics?.last7Days.averageDurationSec)}
          </span>
          {/* 값이 "—"(최근 7일 데이터 없음)이면 증감(▼)을 표기하지 않는다 */}
          {analytics && analytics.last7Days.averageDurationSec != null && (
            <Delta
              current={analytics.last7Days.averageDurationSec}
              previous={analytics.previous7Days.averageDurationSec ?? 0}
            />
          )}
        </div>
        <div className="border-line-normal-normal flex flex-col gap-[4px] rounded-[12px] border p-[16px]">
          <span className="text-label-2-medium text-label-alternative">
            평균 별점
          </span>
          <span className="text-heading-1-bold">
            {stats?.overall.averageRating != null
              ? stats.overall.averageRating.toFixed(1)
              : "-"}
          </span>
        </div>
      </div>

      {/* ② 섹션별 체류시간 (max 기준 상대 비율 bar) */}
      <div className="border-line-normal-normal flex flex-col gap-[8px] rounded-[12px] border p-[16px]">
        <h4 className="text-body-1-normal-bold">섹션별 체류시간</h4>
        {(analytics?.sectionDwells.length ?? 0) === 0 && (
          <p className="text-label-1-normal-medium text-label-alternative">
            아직 수집된 체류시간이 없어요
          </p>
        )}
        {analytics?.sectionDwells.map((dwell) => (
          <button
            key={dwell.section}
            type="button"
            className="flex items-center gap-[8px] text-left"
            onClick={() => setSectionTab(dwell.section as EditorBlockType)}
          >
            <span className="text-label-1-normal-medium w-[80px] shrink-0">
              {BLOCK_TYPE_LABELS[dwell.section as EditorBlockType] ??
                dwell.section}
            </span>
            <span className="h-[10px] flex-1 overflow-hidden rounded-[5px] bg-[#f0f0f2]">
              <span
                className="block h-full rounded-[5px] bg-[#0066FF]"
                style={{
                  width: `${(dwell.averageDwellSec / maxDwell) * 100}%`,
                }}
              />
            </span>
            <span className="text-label-2-medium w-[48px] shrink-0 text-right">
              {formatSec(dwell.averageDwellSec)}
            </span>
          </button>
        ))}
      </div>

      {/* ③·④ 섹션별 / 전체 피드백 탭 */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap gap-[6px]">
          <button
            type="button"
            onClick={() => setSectionTab("OVERALL")}
            className={`text-label-2-medium h-[30px] rounded-[8px] border px-[10px] ${
              sectionTab === "OVERALL"
                ? "border-primary-normal bg-primary-normal text-white"
                : "border-line-normal-normal text-label-normal"
            }`}
          >
            전체 피드백 {stats ? `(${stats.overall.count})` : ""}
          </button>
          {BLOCK_EDITOR_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSectionTab(type)}
              className={`text-label-2-medium h-[30px] rounded-[8px] border px-[10px] ${
                sectionTab === type
                  ? "border-primary-normal bg-primary-normal text-white"
                  : "border-line-normal-normal text-label-normal"
              }`}
            >
              {BLOCK_TYPE_LABELS[type]} ({sectionCount(type)})
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="border-line-normal-normal text-label-1-normal-medium text-label-alternative rounded-[12px] border p-[24px] text-center">
            아직 받은 피드백이 없어요
          </p>
        )}
        <ul className="flex flex-col gap-[8px]">
          {visible.map((feedback) => (
            <li
              key={feedback.id}
              className="border-line-normal-normal flex flex-col gap-[6px] rounded-[12px] border p-[16px]"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={feedback.rating} />
                <span className="text-label-2-medium text-label-alternative">
                  {new Date(feedback.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
              {feedback.tags.length > 0 && (
                <div className="flex flex-wrap gap-[4px]">
                  {feedback.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-label-2-medium rounded-[6px] bg-[#f0f4ff] px-[8px] py-[2px] text-[#0066FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {feedback.comment && (
                <p className="text-label-1-normal-medium whitespace-pre-line">
                  {feedback.comment}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
