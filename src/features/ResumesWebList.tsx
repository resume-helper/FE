"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import {
  API_CLIENT_RESUMES_ANALYTICS,
  API_CLIENT_RESUMES_FEEDBACK_STATS,
} from "@/entities/resumes/detail/api/api.client.resumes.detail";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useResumseListHook } from "@/entities/resumes/list/hook/useResumseListHook";
import { useResumesListDeleteStore } from "@/entities/resumes/list/store/useResumesListDeleteStore";

import { DateFormat } from "@/shared/util/dateFormat";

import { Spinner } from "@/shared/ui/Spinner";
import { List } from "@/shared/ui/ListCell";
import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";

/** 이력서별 실측 지표 한 줄 — analytics(조회·체류) + feedback-stats(별점) */
const WebResumeStatsLine = ({ resumeId }: { resumeId: number }) => {
  const { data: analytics } = useQuery({
    queryKey: ["resumeAnalytics", resumeId],
    queryFn: () => API_CLIENT_RESUMES_ANALYTICS(resumeId),
  });
  const { data: stats } = useQuery({
    queryKey: ["resumeFeedbackStats", resumeId],
    queryFn: () => API_CLIENT_RESUMES_FEEDBACK_STATS(resumeId),
  });

  const durationSec = analytics?.last7Days.averageDurationSec ?? null;
  const duration =
    durationSec === null
      ? "—"
      : durationSec >= 60
        ? `${Math.floor(durationSec / 60)}분 ${Math.round(durationSec % 60)}초`
        : `${Math.round(durationSec)}초`;

  let ratingWeighted = 0;
  let ratingCount = 0;
  if (stats) {
    [stats.overall, ...stats.sections].forEach((group) => {
      if (group.averageRating !== null && group.count > 0) {
        ratingWeighted += group.averageRating * group.count;
        ratingCount += group.count;
      }
    });
  }

  return (
    <dd className="space-x-[10px] text-[0.8125rem] font-[400] text-[#37383C9C]">
      <span>
        조회수 {analytics ? analytics.totalViews.toLocaleString() : "—"}
      </span>
      <span>체류시간 {duration}</span>
      <span>
        별점 {ratingCount > 0 ? (ratingWeighted / ratingCount).toFixed(1) : "—"}
      </span>
    </dd>
  );
};

export const ResumesWebList = () => {
  const searchParams = useSearchParams();

  const { isDelete, delelteIds, CheckDeleteIdsCallback } =
    useResumesListDeleteStore(
      useShallow((state) => ({
        isDelete: state.isDelete,
        delelteIds: state.delelteIds,
        CheckDeleteIdsCallback: state.CheckDeleteIdsCallback,
      }))
    );

  const { total, data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useResumseListHook("WEB");

  const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
    threshold: 0,
  });

  useEffect(() => {
    if (!isView) return;
    if (isLoading) return;
    if (total === 0) return;
    if (isFetching) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [isView]);

  if (total === 0) {
    return (
      <div className="mt-[200px] text-center">
        <dl>
          <dt className="text-[1.0625rem] font-[500]">웹 이력서가 없어요.</dt>
          <dd className="mt-[4px] text-[0.9375rem] text-[#2E2F33E0]">
            웹 이력서를 생성하고 링크로 공유해보세요.
          </dd>
        </dl>
        <Button
          className="mt-[20px]"
          as={Link}
          href={`/r/resumes/web/add?${searchParams.toString()}`}
        >
          이력서 생성
        </Button>
      </div>
    );
  } else {
    return (
      <List className="relative min-h-[calc(100dvh-232px)] rounded-[16px] bg-[#fff] p-[8px_24px]">
        {data?.pages.map((page) => {
          if (!page) return <></>;

          const list = page.content;

          return list?.map((el, i) => {
            return (
              <li
                className="flex h-[94px] items-center text-[#171719]"
                key={`WEB-이력서-리스트-${el.title}-${i}`}
              >
                {isDelete && (
                  <CheckBox
                    className="mr-[12px]"
                    checked={delelteIds.has(el.id)}
                    onCheckedChange={(checked) =>
                      CheckDeleteIdsCallback(checked === true, el.id)
                    }
                  />
                )}
                <p
                  className={`mr-[16px] h-[24px] w-[48px] shrink-0 leading-[24px] ${el.isPublic ? "bg-[#EBFAF0] text-[#00BF40]" : "bg-[#FFF0F0] text-[#FF4242]"} rounded-[6px] text-center text-[0.75rem]`}
                >
                  {el.isPublic ? "공개" : "비공개"}
                </p>
                <dl className="pt-[16px]">
                  <dt className="w-[572px] truncate text-[1.0625rem] font-[500]">
                    <Link href={`/r/resumes/web/${el.id}`}>{el.title}</Link>
                  </dt>
                  <WebResumeStatsLine resumeId={el.id} />
                </dl>
                <div className="ml-auto flex items-center gap-[8px]">
                  <p className="text-[0.875rem]">
                    {DateFormat(el.createdAt, "yyyy-mm-dd")}
                  </p>
                </div>
              </li>
            );
          });
        })}
        {isLoading ||
          (isFetching && (
            <li>
              <Spinner className="absolute bottom-[0px] left-1/2 -translate-1/2" />
            </li>
          ))}
        <li ref={ref} style={{ height: "1px" }}></li>
      </List>
    );
  }
};
