"use client";

import { ResumesListSearch } from "@/features/ResumesListSearch";
import { ResumesPdfList } from "@/features/ResumesPdfList";
import { BtnAddResumes } from "@/features/BtnAddResumes";
import { ResumesListDeleteBtns } from "@/features/ResumesListDeleteBtns";

export const ResumesPdfListBox = () => {
  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        PDF 이력서
        <BtnAddResumes type="PDF" />
      </h2>
      <article className="mb-[20px] flex items-center">
        <ResumesListSearch />
        <ResumesListDeleteBtns className="ml-auto" />
      </article>
      <ResumesPdfList />
    </section>
  );
};
