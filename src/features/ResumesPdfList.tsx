"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useEffect } from "react";

import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useResumseListHook } from "@/entities/resumes/list/hook/useResumseListHook";

import { useResumsesDeleteStore } from "@/entities/resumes/delete/store/useResumsesDeleteStore";

import { List } from "@/shared/ui/ListCell";
import { Button } from "@/shared/ui/Button";

import { ResumsePdfListItem } from "@/entities/resumes/list/ui/ResumsePdfListItem";
import { ListLoadingIcon } from "@/shared/ui/ListLoadingIcon";

export const ResumesPdfList = () => {
  const searchParams = useSearchParams();

  const { total, data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useResumseListHook("PDF");

  const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
    threshold: 0,
  });

  const ResetDeleteStore = useResumsesDeleteStore(
    (state) => state.ResetDeleteStore
  );

  useEffect(() => {
    if (!isView) return;
    if (isLoading) return;
    if (total === 0) return;
    if (isFetching) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [isView]);

  useEffect(() => {
    return () => ResetDeleteStore();
  }, []);

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
              <ResumsePdfListItem
                key={`PDF-이력서-리스트-${el.title}-${i}`}
                item={el}
              />
            );
          });
        })}
        {(isLoading || isFetching) && <ListLoadingIcon />}
        <li ref={ref} style={{ height: "1px" }}></li>
      </List>
    );
  }
};
