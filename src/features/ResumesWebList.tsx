"use client";
import Image from "next/image";

import { useEffect } from "react";

import { Spinner } from "@/shared/ui/Spinner";
import { DateFormat } from "@/shared/util/dateFormat";

import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useResumseListHook } from "@/entities/resumes/list/hook/useResumseListHook";
import SvgDownload from "@/shared/icons/Download";

export const ResumesWebList = () => {
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useResumseListHook("WEB", "NEWEST");

  const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
    threshold: 0,
  });

  useEffect(() => {
    if (!isView) return;
    if (isLoading) return;
    if (isFetching) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [isView]);

  return (
    <ol className="relative min-h-[200px]">
      {data?.pages.map((page) => {
        if (!page) return <></>;

        const list = page.content;

        return list?.map((el, i) => {
          return (
            <li
              className="flex h-[94px] items-center text-[#171719]"
              key={`웹이력서-리스트-${el.title}-${i}`}
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
                <p className="text-[0.875rem]">{DateFormat(el.createdAt)}</p>
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
          <Spinner className="absolute bottom-[0px] left-1/2 -translate-1/2" />
        ))}
      <li ref={ref} style={{ height: "1px" }}></li>
    </ol>
  );
};
