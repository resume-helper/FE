"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { useState } from "react";

import { ChevronRight } from "@/shared/icons";

import { LatestResumesPdfList } from "@/features/LatestResumesPdfList";

const LatestResumesWebList = dynamic(() =>
  import("@/features/LatestResumesWebList").then(
    (rs) => rs.LatestResumesWebList
  )
);

export const LatestResumesTabBox = () => {
  const [tabStatus, SetTabStatus] = useState<"PDF" | "WEB">("PDF");

  return (
    <article className="w-full">
      <h2 className="sr-only">최근 생성한 {tabStatus} 이력서</h2>
      <div className="flex h-[56px] items-center gap-[24px] border-b border-b-[#70737C14] [&>button]:relative [&>button]:h-full [&>button]:text-[1.25rem] [&>button]:font-[600] [&>button]:text-[#37383C47] [&>button.on]:text-[#000] [&>button.on::before]:block [&>button::before]:absolute [&>button::before]:bottom-0 [&>button::before]:left-0 [&>button::before]:hidden [&>button::before]:h-[2px] [&>button::before]:w-full [&>button::before]:bg-[#000] [&>button::before]:content-['']">
        <button
          onClick={() => SetTabStatus("PDF")}
          className={`${tabStatus === "PDF" && "on"}`}
        >
          PDF 이력서
        </button>
        <button
          onClick={() => SetTabStatus("WEB")}
          className={`${tabStatus === "WEB" && "on"}`}
        >
          웹 이력서
        </button>
        <Link
          href={`${tabStatus === "PDF" ? "/r/resumes/pdf" : "/r/resumes/web"}`}
          className="ml-auto block"
        >
          <ChevronRight />
        </Link>
      </div>
      {tabStatus === "PDF" && <LatestResumesPdfList />}
      {tabStatus === "WEB" && <LatestResumesWebList />}
    </article>
  );
};
