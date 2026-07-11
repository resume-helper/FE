"use client";

import { Button } from "@/shared/ui/Button";

interface FORM_HEAD {
  title: string;
}

export const FormHead = ({ title }: FORM_HEAD) => {
  return (
    <article className="flex h-[88px] items-center">
      <h2 className="text-[2rem]">{title}</h2>
      <ul className="ml-auto [&>li>button]:h-[48px] [&>li>button]:w-[130px]">
        <li>
          <Button type="submit">저장</Button>
        </li>
      </ul>
    </article>
  );
};
