"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useSessionHook } from "@/entities/auth/social-login/hook/useSessionHook";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";

import SvgChevronDown from "@/shared/icons/ChevronDown";

export const UserProfileBox = () => {
  const { user } = useSessionHook();

  const [isUtilList, SetIsUtilList] = useState(false);

  return (
    <div className="flex items-center">
      <div className="relative order-2">
        <button
          onClick={() => SetIsUtilList(true)}
          className="flex items-center gap-[4px]"
        >
          {user?.name}
          <SvgChevronDown />
        </button>
        {isUtilList && (
          <>
            <ul className="absolute top-[40px] right-[0] z-3 w-[176px] rounded-[16px] border border-[#EAEBEC] bg-[#fff] p-[8px] shadow-[0px_4px_6px_-1px_#1717170F,_0px_2px_4px_-2px_#1717170F] [&>li>*]:block [&>li>*]:h-[40px] [&>li>*]:rounded-[8px] [&>li>*]:px-[12px] [&>li>*]:leading-[40px] [&>li>*]:font-[400]">
              <li>
                <Link href="" className="bg-[#f6f6f6] text-[#171719]">
                  마이페이지
                </Link>
              </li>
              <li>
                <button onClick={LogoutCallback} className="text-[#FF4242]">
                  로그아웃
                </button>
              </li>
            </ul>
            <div
              onClick={() => SetIsUtilList(false)}
              className="fixed top-0 left-0 z-2 h-full w-full"
            ></div>
          </>
        )}
      </div>
      <div className="order-1 mr-[12px] size-[32px] overflow-hidden rounded-[100%]">
        <Image
          width={32}
          height={32}
          src={user?.profileImageUrl as string}
          alt={`${user?.name} 프로필 이미지`}
          unoptimized
          loading="eager"
        />
      </div>
    </div>
  );
};
