"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const BtnAddResumes = dynamic(() =>
  import("@/features/BtnAddResumes").then((rs) => rs.BtnAddResumes)
);

const ResumesPdfList = dynamic(() =>
  import("@/features/ResumesPdfList").then((rs) => rs.ResumesPdfList)
);

export const ResumesPdfListBox = () => {
  const total: number = 10;

  if (total === 0) {
    return (
      <div className="mt-[371px] text-center">
        <dl>
          <dt className="text-[1.0625rem] font-[500]">PDF 이력서가 없어요.</dt>
          <dd className="mt-[4px] text-[0.9375rem] text-[#2E2F33E0]">
            PDF 이력서를 생성하고 링크로 공유해보세요.
          </dd>
        </dl>
        <Link
          className="mt-[20px] ml-[8px] inline-block h-[48px] w-[130px] rounded-[12px] border border-[#256EF4] bg-[#256EF4] text-center text-[1rem] leading-[45px] text-[#fff]"
          href={"/r/resumes/pdf/add"}
        >
          이력서 생성
        </Link>
      </div>
    );
  } else {
    return (
      <section>
        <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
          PDF 이력서
          <BtnAddResumes type="PDF" />
        </h2>
        <article className="mb-[20px] flex">
          <input
            className="w-[240px] border border-[#E0E0E0] px-[10px] text-[#33333380]"
            type="text"
            placeholder="이력서 제목 검색"
          />
          <div className="ml-[8px] h-[48px] w-[136px] bg-[#f0f]"></div>

          <button className="ml-auto h-[40px] w-[67px] rounded-[10px] border border-[#70737C29] text-[0.9375rem] leading-[40px] font-[500] text-[#171719]">
            선택
          </button>
        </article>
        <ResumesPdfList />
      </section>
    );
  }
};
