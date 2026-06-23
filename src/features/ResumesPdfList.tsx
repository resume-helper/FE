"use client";

import { Download } from "@/shared/icons";

export const ResumesPdfList = () => {
  return (
    <>
      <ol className="rounded-[16px] bg-[#fff] px-[24px]">
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <li
              className="flex h-[88px] items-center [&:nth-child(n+2)]:border-t [&:nth-child(n+2)]:border-t-[#F4F4F5]"
              key={`pdf이력서_${i}`}
            >
              <dl className="flex h-[40px] leading-[40px] text-[#171719]">
                <dt className="w-[721px] truncate text-[1.0625rem]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Explicabo eum doloribus voluptatem debitis alias corporis
                  eveniet optio accusamus necessitatibus veniam hic, doloremque,
                  ducimus cumque tempora exercitationem a! Eaque, rem ducimus.
                </dt>

                <dd className="ml-[20px] w-[91px] text-[0.875rem]">
                  2026.06.22
                </dd>
              </dl>
              <button title={`이력서 다운로드`}>
                <Download />
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
};
