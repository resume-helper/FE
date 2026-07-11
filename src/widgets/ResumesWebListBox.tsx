"use client";

import Link from "next/link";

import { ResumesListSearch } from "@/features/ResumesListSearch";
import { ResumesWebList } from "@/features/ResumesWebList";
import { ResumesListDeleteBtns } from "@/features/ResumesListDeleteBtns";

import { Button } from "@/shared/ui/Button";

export const ResumesWebListBox = () => {
  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        웹 이력서
        <Button as={Link} href={"/r/resumes/web/add"} size={"large"}>
          이력서 생성
        </Button>
      </h2>
      <article className="mb-[20px] flex h-[48px] items-center">
        <ResumesListSearch />
        <ResumesListDeleteBtns type="WEB" className="ml-auto" />
      </article>
      <ResumesWebList />
    </section>
  );
};
