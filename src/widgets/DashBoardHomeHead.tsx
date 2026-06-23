"use client";

import { useSessionHook } from "@/entities/auth/social-login/hook/useSessionHook";

import { BtnAddBlocks } from "@/features/BtnAddBlocks";
import { BtnAddResumes } from "@/features/BtnAddResumes";

export const DashBoardHomeHead = () => {
  const { user } = useSessionHook();
  return (
    <section className="flex h-[120px] w-full items-end justify-between py-[20px]">
      <h2 className="[&>span]:block">
        <span className="font-400 text-[1.5rem] leading-[133%]">
          안녕하세요, {user?.name}님
        </span>
        <span className="font-500 text-[2rem] leading-[138%]">
          블록을 조합해 이력서를 만들어보세요.
        </span>
      </h2>
      <div className="flex gap-[8px]">
        <BtnAddBlocks />
        <BtnAddResumes />
      </div>
    </section>
  );
};
