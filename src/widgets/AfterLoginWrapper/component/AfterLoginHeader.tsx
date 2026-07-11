"use client";

import { usePathname } from "next/navigation";

// import { IconSideMenu } from "@/shared/icon/SideMenu"

import { UserProfileBox } from "@/features/UserProfileBox";
import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";
import { LeftSide } from "@/shared/icons/LeftSide";

const PAGE_TITLE: Record<string, string> = {
  "/r": "홈",
  "/r/resumes/pdf": "PDF 이력서",
  "/r/resumes/web": "WEB 이력서",
  "/r/blocks": "블록 라이브러리",
  "/r/blocks/add": "블록 생성",
};

export const AfterLoginHeader = () => {
  const pathname = usePathname();

  const ToggleSideMenuCallback = useAfterLoginSideMenuStore(
    (state) => state.ToggleSideMenuCallback
  );

  return (
    <header className="sticky top-0 z-2 flex h-[56px] w-full items-center justify-between bg-[#f7f7f8] px-[20px]">
      <button
        className="flex cursor-pointer items-center gap-[12px] text-[0.9375rem] font-[500]"
        onClick={ToggleSideMenuCallback}
      >
        <LeftSide />
        {PAGE_TITLE[pathname]}
      </button>

      <UserProfileBox />
    </header>
  );
};
