"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import { Logo } from "@/shared/ui/Logo";

import { useAfterLoginSideMenuStore } from "@/shared/store/useAfterLoginSideMenuStore";
import SvgChevronDown from "@/shared/icons/ChevronDown";

const ACTIVE_CLASS = "text-[#0B50D0] bg-[#ECF2FE] fill-[#0B50D0]";

export const AfterLoginSideMenu = () => {
  const pathname = usePathname();

  const [isResumeNav, SetIsResumeNav] = useState(true);

  const isSideMenu = useAfterLoginSideMenuStore((state) => state.isSideMenu);

  return (
    <aside
      className={`${isSideMenu ? "" : "close"} h-dvh w-[240px] border-r border-r-[#E1E2E4] bg-[#fff] shadow-[5px_0px_10px_0px_rgba(0,0,0,0.05)] transition-[width] duration-150 [&.close]:w-[0] [&.close>.container]:translate-x-[-240px]`}
    >
      <div className="relative container h-full w-[240px]">
        <div className="flex h-[56px] items-center border-b border-b-[#E1E2E4] pl-[20px]">
          <Logo />
        </div>
        <nav className="mt-[12px] px-[20px]">
          <ul className="[&>li>.btn]:flex [&>li>.btn]:h-[40px] [&>li>.btn]:w-full [&>li>.btn]:items-center [&>li>.btn]:gap-[8px] [&>li>.btn]:rounded-[8px] [&>li>.btn]:pl-[8px] [&>li>.btn]:text-[0.9375rem]">
            <li>
              <Link
                className={`btn ${pathname === "/r" && ACTIVE_CLASS}`}
                href={"/r"}
              >
                {/* <IconHome/> */}홈
              </Link>
            </li>

            <li className="w-full">
              <button
                onClick={() => SetIsResumeNav(!isResumeNav)}
                className="btn"
              >
                이력서{" "}
                <SvgChevronDown
                  className={`relative ml-auto ${isResumeNav ? "rotate-[0]" : "rotate-[180deg]"}`}
                />
              </button>
              {isResumeNav && (
                <ul className="pl-[20px] [&>li>a]:block [&>li>a]:h-[36px] [&>li>a]:rounded-[8px] [&>li>a]:pl-[8px] [&>li>a]:text-[0.875rem] [&>li>a]:leading-[36px]">
                  <li>
                    <Link
                      href={"/r/resumes/pdf"}
                      className={`${pathname === "/r/resumes/pdf" && ACTIVE_CLASS}`}
                    >
                      PDF 이력서
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/r/resumes/web"}
                      className={`${pathname === "/r/resumes/web" && ACTIVE_CLASS}`}
                    >
                      WEB 이력서
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-[4px]">
              <Link
                className={`btn ${pathname === "/r/blocks" && ACTIVE_CLASS}`}
                href={"/r/blocks"}
              >
                블록 라이브러리
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 flex h-[70px] w-full items-center justify-center gap-[20px] leading-[70px] [&>button]:text-[0.8125rem] [&>button]:text-[#37383C9C] [&>button]:underline">
          <button>서비스 소개</button>
          <button>문의하기</button>
        </div>
      </div>
    </aside>
  );
};
