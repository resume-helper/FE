"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { oauthLogin } from "@/features/auth/api/api";
import { KakaoLoginButton } from "@/features/auth/components/KakaoLoginButton";
import { NaverLoginButton } from "@/features/auth/components/NaverLoginButton";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import { Button } from "@/shared/ui/Button";
import {
  Popup,
  PopupContainer,
  PopupNavigation,
  PopupContent,
  PopupContentItem,
  PopupHeading,
  PopupDescription,
  PopupActionArea,
  PopupActionButton,
  PopupTrigger,
} from "@/shared/ui/Popup";

export function GuestMenu() {
  const [loginOpen, setLoginOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [errorOpen, setErrorOpen] = useState(() => !!searchParams.get("error"));

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider: Parameters<typeof oauthLogin>[0]) => {
    oauthLogin(provider);
    setLoginOpen(false);
  };

  // 에러 초기화
  const closeError = () => {
    setErrorOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    router.replace(params.size ? `${pathname}?${params}` : pathname);
  };

  return (
    <>
      {/* 로그인 팝업 */}
      <Popup open={loginOpen} onOpenChange={setLoginOpen}>
        <PopupTrigger asChild>
          <Button variant="solid" color="primary" size="small">
            로그인
          </Button>
        </PopupTrigger>

        <PopupContainer size="medium" aria-label="소셜 로그인">
          <PopupNavigation variant="normal">서비스명</PopupNavigation>
          <PopupContent>
            <PopupContentItem>
              <div className="flex w-full flex-col gap-12">
                <div className="flex flex-col gap-3">
                  <PopupHeading className="text-center">
                    [서비스명]에 오신 것을 환영합니다!
                  </PopupHeading>
                  <PopupDescription className="text-center">
                    내 이력서는 얼마나 먹힐까 궁금하시지 않나요?
                    <br />
                    이력서 제작부터 피드백 까지 한번에 받아보세요
                  </PopupDescription>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <KakaoLoginButton
                    onClick={() => handleSocialLogin("kakao")}
                  />
                  <NaverLoginButton
                    onClick={() => handleSocialLogin("naver")}
                  />
                  <GoogleLoginButton
                    onClick={() => handleSocialLogin("google")}
                  />
                </div>
              </div>
            </PopupContentItem>
          </PopupContent>
        </PopupContainer>
      </Popup>

      {/* 로그인 실패 팝업 */}
      <Popup
        open={errorOpen}
        onOpenChange={(open) => {
          if (!open) closeError();
        }}
      >
        <PopupContainer
          size="medium"
          disableOutsideClickClose
          aria-label="로그인 실패"
        >
          <PopupNavigation variant="normal">로그인 실패</PopupNavigation>
          <PopupContent>
            <PopupContentItem align="center">
              <PopupHeading>로그인에 실패했습니다</PopupHeading>
            </PopupContentItem>
          </PopupContent>
          <PopupActionArea variant="neutral">
            <PopupActionButton
              color="primary"
              fullWidth
              onClick={() => {
                closeError();
                setLoginOpen(true);
              }}
            >
              다시 로그인
            </PopupActionButton>
          </PopupActionArea>
        </PopupContainer>
      </Popup>
    </>
  );
}
