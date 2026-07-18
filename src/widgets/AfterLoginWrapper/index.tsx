"use client";

import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";

import { AfterLoginHeader } from "./component/AfterLoginHeader";
import { AfterLoginSideMenu } from "./component/AfterLoginSideMenu";

export const AfterLoginWrapper = ({ children }: LAYOUT_CHILD) => {
  const isSideMenu = useAfterLoginSideMenuStore((state) => state.isSideMenu);

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
