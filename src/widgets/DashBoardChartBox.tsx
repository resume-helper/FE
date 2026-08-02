"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import {
  API_CLIENT_RESUMES_ANALYTICS,
  API_CLIENT_RESUMES_FEEDBACK_STATS,
} from "@/entities/resumes/detail/api/api.client.resumes.detail";
import { API_CLIENT_RESUMSES_LIST } from "@/entities/resumes/list/api/api.client.resumes.list";
import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";

/** 대시보드 집계 — BE에 전체 집계 API가 없어 WEB 이력서별 analytics/stats 를 합산한다 */
interface DashboardStats {
  totalViews: number;
  viewsDeltaPercent: number | null;
  avgDurationSec: number | null;
  durationDeltaSec: number | null;
  avgRating: number | null;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const list = await API_CLIENT_RESUMSES_LIST({
    offset: 1, // 목록 API 는 1-베이스 (0 이면 BE PageRequest 가 -1 로 죽는다)
    limit: 50,
    type: "WEB",
    sort: "NEWEST",
  });
  const resumes = list.content ?? [];

  const results = await Promise.all(
    resumes.map(async (resume) => {
      const [analytics, stats] = await Promise.all([
        API_CLIENT_RESUMES_ANALYTICS(resume.id).catch(() => null),
        API_CLIENT_RESUMES_FEEDBACK_STATS(resume.id).catch(() => null),
      ]);
      return { analytics, stats };
    })
  );

  let totalViews = 0;
  let last7Views = 0;
  let prev7Views = 0;
  let last7DurationWeighted = 0;
  let prev7DurationWeighted = 0;
  let ratingWeighted = 0;
  let ratingCount = 0;

  results.forEach(({ analytics, stats }) => {
    if (analytics) {
      totalViews += analytics.totalViews;
      last7Views += analytics.last7Days.viewCount;
      prev7Views += analytics.previous7Days.viewCount;
      if (analytics.last7Days.averageDurationSec !== null)
        last7DurationWeighted +=
          analytics.last7Days.averageDurationSec *
          analytics.last7Days.viewCount;
      if (analytics.previous7Days.averageDurationSec !== null)
        prev7DurationWeighted +=
          analytics.previous7Days.averageDurationSec *
          analytics.previous7Days.viewCount;
    }
    if (stats) {
      const groups = [stats.overall, ...stats.sections];
      groups.forEach((group) => {
        if (group.averageRating !== null && group.count > 0) {
          ratingWeighted += group.averageRating * group.count;
          ratingCount += group.count;
        }
      });
    }
  });

  const last7AvgDuration =
    last7Views > 0 ? last7DurationWeighted / last7Views : null;
  const prev7AvgDuration =
    prev7Views > 0 ? prev7DurationWeighted / prev7Views : null;

  return {
    totalViews,
    viewsDeltaPercent:
      prev7Views > 0 ? ((last7Views - prev7Views) / prev7Views) * 100 : null,
    avgDurationSec: last7AvgDuration,
    durationDeltaSec:
      last7AvgDuration !== null && prev7AvgDuration !== null
        ? last7AvgDuration - prev7AvgDuration
        : null,
    avgRating: ratingCount > 0 ? ratingWeighted / ratingCount : null,
  };
}

function formatDuration(sec: number | null) {
  if (sec === null) return "—";
  const rounded = Math.round(sec);
  const min = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return min > 0 ? `${min}분 ${rest}초` : `${rest}초`;
}

function formatSigned(value: number, suffix: string) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded >= 0 ? "+" : ""}${rounded}${suffix}`;
}

export const DashBoardChartBox = () => {
  const isSideMenu = useAfterLoginSideMenuStore((state) => state.isSideMenu);

  const { data: stats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  return (
    <section className="flex gap-[16px]">
      <h2 className="sr-only">전체 열람수, 평균 체류시간, 평균 별점 박스</h2>
      <article
        className={`relative ${isSideMenu ? "w-[296px]" : "w-[376px]"} h-[176px] rounded-[12px] border border-[#70737C14] bg-[#fff] p-[24px] shadow-[0px_4px_6px_-1px_#1717170F] transition-[width] duration-150`}
      >
        <h2 className="flex items-center justify-between text-[0.875rem] font-[600] text-[#37383C9C]">
          전체 열람 수{" "}
          {stats?.viewsDeltaPercent != null && (
            <span
              title="최근 7일 대비 이전 7일 변화"
              className="text-[0.75rem] text-[#0B50D0]"
            >
              {formatSigned(stats.viewsDeltaPercent, "%")}
            </span>
          )}
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">
          {stats ? stats.totalViews.toLocaleString() : "—"}
        </p>
        <Image
          className="absolute right-[24px] bottom-[24px]"
          width={140}
          height={86}
          loading="eager"
          src={"/chart01.png"}
          alt="전체 열람 수 이미지"
        />
      </article>
      <article
        className={`relative ${isSideMenu ? "w-[296px]" : "w-[376px]"} h-[176px] rounded-[12px] border border-[#70737C14] bg-[#fff] p-[24px] shadow-[0px_4px_6px_-1px_#1717170F] transition-[width] duration-150`}
      >
        <h2 className="flex items-center justify-between text-[0.875rem] font-[600] text-[#37383C9C]">
          평균 체류시간{" "}
          {stats?.durationDeltaSec != null && (
            <span
              title="최근 7일 대비 이전 7일 변화"
              className="text-[0.75rem] text-[#0B50D0]"
            >
              {formatSigned(stats.durationDeltaSec, "초")}
            </span>
          )}
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">
          {stats ? formatDuration(stats.avgDurationSec) : "—"}
        </p>
        <Image
          className="absolute right-[24px] bottom-[24px]"
          width={140}
          height={86}
          loading="eager"
          src={"/chart01.png"}
          alt="평균 체류시간 이미지"
        />
      </article>
      <article
        className={`relative ${isSideMenu ? "w-[296px]" : "w-[376px]"} h-[176px] rounded-[12px] border border-[#70737C14] bg-[#fff] p-[24px] shadow-[0px_4px_6px_-1px_#1717170F] transition-[width] duration-150`}
      >
        <h2 className="flex items-center justify-between text-[0.875rem] font-[600] text-[#37383C9C]">
          전체 별점
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">
          {stats?.avgRating != null ? stats.avgRating.toFixed(1) : "—"}
        </p>
        <Image
          className="absolute right-[24px] bottom-[24px]"
          width={126}
          height={92}
          loading="eager"
          src={"/chart02.png"}
          alt="평균 별점 이미지"
        />
      </article>
    </section>
  );
};
