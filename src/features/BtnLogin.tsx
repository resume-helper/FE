"use client";

import { signIn } from "next-auth/react";

import { useEffect, useState } from "react";

import Close from "@/shared/icons/Close";
import { Button } from "@/shared/ui/Button";
import { Portal } from "@/shared/ui/Portal";

/** 소셜 로그인 모달 — 헤더 로그인 버튼·랜딩 CTA 공용 */
export const LoginModal = ({ onClose }: { onClose: () => void }) => {
  function OnClickSSOLoginCallback(provider: "google" | "naver" | "kakao") {
    signIn(provider, { callbackUrl: window.location.href });
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <Portal>
      <div
        className="fixed top-[0] left-[0] z-2 h-full w-full bg-[rgba(0,0,0,0.5)]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="absolute top-1/2 left-1/2 max-w-[520px] min-w-[320px] -translate-1/2 rounded-[24px] bg-[#fff] p-[20px] text-center">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute top-[16px] right-[16px] cursor-pointer text-[#6b7280]"
          >
            <Close width={20} height={20} />
          </button>
          <dl>
            <dt className="text-[1.5rem] leading-[133%] font-[700] tracking-[-2.3%]">
              Resumate
            </dt>
            <dd className="my-[16px_12px] text-[1.0625rem] leading-[141%] font-[600]">
              Resumate에 오신 것을 환영합니다!
            </dd>
            <dd className="text-[0.9375rem] leading-[160%] font-[500] tracking-[0.96%] [&>span]:block">
              <span>내 이력서는 얼마나 먹힐까 궁금하시지 않나요?</span>
              <span>이력서 제작부터 피드백까지 한번에 받아보세요!</span>
            </dd>
          </dl>

          <ul className="mt-[20px] space-y-[12px] [&>li>button]:h-[52px] [&>li>button]:w-[480px] [&>li>button]:cursor-pointer [&>li>button]:rounded-[100px] [&>li>button]:font-[600] [&>li>button]:tracking-[0.57%]">
            <li>
              <button
                onClick={() => OnClickSSOLoginCallback("kakao")}
                className="bg-[#FEE500]"
              >
                카카오 로그인
              </button>
            </li>
            <li>
              <button
                onClick={() => OnClickSSOLoginCallback("google")}
                className="border border-[#747775] bg-[#fff]"
              >
                구글로 로그인
              </button>
            </li>
            <li>
              <button
                onClick={() => OnClickSSOLoginCallback("naver")}
                className="bg-[#03C75A]"
              >
                네이버 로그인
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Portal>
  );
};

export const BtnLogin = () => {
  const [isMenu, SetIsMenu] = useState(false);

  function OnClickMenuToggleCallback() {
    SetIsMenu(!isMenu);
  }

  return (
    <>
      <Button
        onClick={OnClickMenuToggleCallback}
        color={"primary"}
        size={"medium"}
        iconOnly={false}
        disabled={false}
        loading={false}
        leadingIcon={false}
        trailingIcon={false}
      >
        로그인
      </Button>

      {isMenu && <LoginModal onClose={OnClickMenuToggleCallback} />}
    </>
  );
};
