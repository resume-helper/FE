"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useEffect } from "react";

import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useResumseListHook } from "@/entities/resumes/list/hook/useResumseListHook";

import { DateFormat } from "@/shared/util/dateFormat";

import SvgDownload from "@/shared/icons/Download";
import { Spinner } from "@/shared/ui/Spinner";
import { List } from "@/shared/ui/ListCell";
import { Button } from "@/shared/ui/Button";

export const ResumesWebList = () => {
  const searchParams = useSearchParams();

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
                <p
                  className={`mr-[16px] h-[24px] w-[48px] shrink-0 leading-[24px] ${el.isPublic ? "bg-[#EBFAF0] text-[#00BF40]" : "bg-[#FFF0F0] text-[#FF4242]"} rounded-[6px] text-center text-[0.75rem]`}
                >
                  {el.isPublic ? "공개" : "비공개"}
                </p>
                <dl className="pt-[16px]">
                  <dt className="w-[572px] truncate text-[1.0625rem] font-[500]">
                    {el.title}
                  </dt>
                  <dd className="space-x-[10px] text-[0.8125rem] font-[400] text-[#37383C9C]">
                    <span>조회수 842</span>
                    <span>체류시간 00초</span>
                    <span>별점 4.2</span>
                  </dd>
                </dl>
                <div className="ml-auto flex items-center gap-[8px]">
                  <p className="text-[0.875rem]">
                    {DateFormat(el.createdAt, "yyyy-mm-dd")}
                  </p>
                  <button title={`${el.title} 이력서 다운로드`}>
                    <SvgDownload className="size-[20px]" />
                  </button>
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
