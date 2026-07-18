"use client";

import { DashBoardChartBox } from "@/widgets/DashBoardChartBox";
import { DashBoardHomeHead } from "@/widgets/DashBoardHomeHead";
import { LatestBlockLibararyBox } from "@/widgets/LatestBlockLibararyBox";
import { LatestResumesTabBox } from "@/widgets/LatestResumesTabBox";

const ResumeHelperDashboardPageView = () => {
  return (
    <>
      <h1 className="sr-only">대시보드 홈</h1>
      <DashBoardHomeHead />
      <DashBoardChartBox />
      <section className="mt-[20px] flex gap-[16px] pb-[20px] [&>div]:min-h-[568px] [&>div]:w-[calc(50%-8px)] [&>div]:rounded-[12px] [&>div]:bg-[#fff] [&>div]:p-[12px_24px] [&>div]:shadow-[0px_10px_15px_-3px_#17171712,0px_4px_6px_-2px_#17171712]">
        <h2 className="sr-only">콘텐츠 박스</h2>
        <div>
          <LatestResumesTabBox />
        </div>
        <div>
          <LatestBlockLibararyBox />
        </div>
      </section>
    </>
  );
};

export default ResumeHelperDashboardPageView;
