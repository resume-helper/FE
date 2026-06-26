"use client";

import { Button } from "@/shared/ui/Button";
import { ResumesListSearch } from "@/features/ResumesListSearch";
import { BtnAddResumes } from "@/features/BtnAddResumes";
import { ResumesWebList } from "@/features/ResumesWebList";

export const ResumesWebListBox = () => {
  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        웹 이력서
        <BtnAddResumes type="WEB" />
      </h2>
      <article className="mb-[20px] flex h-[48px] items-center">
        <ResumesListSearch />
        <Button
          className="ml-auto"
          variant={"outlined"}
          size={"medium"}
          color={"assistive"}
        >
          선택
        </Button>
      </article>
      <ResumesWebList />
    </section>
  );
};
