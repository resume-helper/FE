"use client";

import Link from "next/link";

import { ResumesListSearch } from "@/features/ResumesListSearch";
import { ResumesPdfList } from "@/features/ResumesPdfList";
import { ResumesListDeleteBtns } from "@/features/ResumesListDeleteBtns";

import { Button } from "@/shared/ui/Button";

export const ResumesPdfListBox = () => {
  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        PDF 이력서
        <Button as={Link} href={"/r/resumes/pdf/add"} size={"large"}>
          이력서 생성
        </Button>
      </h2>
      <article className="mb-[20px] flex items-center">
        <ResumesListSearch />
        <ResumesListDeleteBtns type="PDF" className="ml-auto" />
      </article>
      <ResumesPdfList />
    </section>
  );
};
