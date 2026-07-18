"use client";

import Link from "next/link";

export const LatestResumesPdfListEmpty = () => {
  return (
    <li className="mt-[204px] text-center">
      <dl>
        <dt className="text-[1.0625rem] font-[500]">PDF 이력서가 없어요.</dt>
        <dd className="mt-[4px] text-[0.9375rem] text-[#2E2F33E0]">
          PDF 이력서를 생성하고 링크로 공유해보세요.
        </dd>
      </dl>
      <Link
        href={"/r/resumes/pdf/add"}
        className="mt-[16px] inline-block h-[32px] w-[78px] rounded-[8px] bg-[#F4F4F5] text-[0.8125rem] leading-[32px] font-[500] text-[#2E2F33E0]"
      >
        이력서 생성
      </Link>
    </li>
  );
};
