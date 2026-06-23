"use client";

import Image from "next/image";

export const Logo = () => {
  return (
    <div className="inline-flex h-[32px] items-center justify-center gap-[8px] font-[Pretendard] text-[1.25rem]">
      <Image
        src={"/logo.png"}
        alt="로고 이미지"
        width={32}
        height={21}
        loading="eager"
      />{" "}
      Resumate
    </div>
  );
};
