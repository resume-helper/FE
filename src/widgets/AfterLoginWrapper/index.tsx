"use client";

import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";

import { AfterLoginHeader } from "./component/AfterLoginHeader";
import { AfterLoginSideMenu } from "./component/AfterLoginSideMenu";
import { useEffect } from "react";

export const AfterLoginWrapper = ({ children }: LAYOUT_CHILD) => {
  const isSideMenu = useAfterLoginSideMenuStore((state) => state.isSideMenu);

  /**
   * 2026.07.11 박수현
   * 경력 블록라이브러리 생성 페이지에서 추가 버튼 클릭시 ui 깨짐 현상 방지를 위해 추가
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="bg-[#f7f7f8]">
      <div className="mx-auto flex w-[1200px] overflow-x-hidden">
        <AfterLoginSideMenu />
        <main
          className={`${!isSideMenu ? "full" : "w-[960px]"} h-dvh overflow-y-auto transition-[width] duration-150 [&.full]:w-full`}
        >
          <AfterLoginHeader />
          <div className="px-[20px]">{children}</div>
        </main>
      </div>
    </div>
  );
};
