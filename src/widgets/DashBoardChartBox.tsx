"use client";

import Image from "next/image";

import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";

export const DashBoardChartBox = () => {
  const isSideMenu = useAfterLoginSideMenuStore((state) => state.isSideMenu);

  return (
    <section className="flex gap-[16px]">
      <h2 className="sr-only">전체 열람수, 평균 체류시간, 평균 별점 박스</h2>
      <article
        className={`relative ${isSideMenu ? "w-[296px]" : "w-[376px]"} h-[176px] rounded-[12px] border border-[#70737C14] bg-[#fff] p-[24px] shadow-[0px_4px_6px_-1px_#1717170F] transition-[width] duration-150`}
      >
        <h2 className="flex items-center justify-between text-[0.875rem] font-[600] text-[#37383C9C]">
          전체 열람 수{" "}
          <span className="text-[0.75rem] text-[#0B50D0]">+12.5%</span>
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">2,482</p>
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
          <span className="text-[0.75rem] text-[#0B50D0]">+0.8초</span>
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">4분 32초</p>
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
          전체 별점{" "}
          <span className="text-[0.75rem] text-[#0B50D0]">+0.2점</span>
        </h2>
        <p className="text-[2rem] font-[400] text-[#171719]">4.8</p>
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
