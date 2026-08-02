"use client";

import { Logo } from "@/shared/ui/Logo";

export const BeforeLoginFooter = () => {
  return (
    <footer className="mt-[60px] h-[124px] w-full bg-[#F7F7F8] px-[20px] pt-[32px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex justify-between">
          <Logo />
          <ul className="flex gap-[12px] text-[#3C3C4399] [&>li>button]:text-[0.8125rem]">
            <li>
              <button>이용약관</button>
            </li>
            <li>
              <button>개인정보 처리방침</button>
            </li>
          </ul>
        </div>
        <p className="mt-[22px] text-[0.75rem] text-[#3C3C4399]">
          © Resumate. 2026. All rights reserved
        </p>
      </div>
    </footer>
  );
};
