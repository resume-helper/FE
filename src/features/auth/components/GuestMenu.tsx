"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  Modal,
  ModalTrigger,
  ModalContainer,
  ModalNavigation,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalDescription,
  ActionArea,
  ActionAreaButton,
} from "@wanteddev/wds";
import { oauthLogin } from "@/features/auth/api/api";
import { KakaoLoginButton } from "@/features/auth/components/KakaoLoginButton";
import { NaverLoginButton } from "@/features/auth/components/NaverLoginButton";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";

export function GuestMenu() {
  const [loginOpen, setLoginOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [errorOpen, setErrorOpen] = useState(() => !!searchParams.get("error"));

  const handleSocialLogin = (provider: Parameters<typeof oauthLogin>[0]) => {
    oauthLogin(provider);
    setLoginOpen(false);
  };

  const closeError = () => {
    setErrorOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    router.replace(params.size ? `${pathname}?${params}` : pathname);
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar variant="person" />

      {/* 로그인 모달 */}
      <Modal open={loginOpen} onOpenChange={setLoginOpen}>
        <ModalTrigger>
          <Button variant="solid" color="primary" size="small">
            로그인
          </Button>
        </ModalTrigger>

        <ModalContainer size="medium" aria-label="소셜 로그인">
          <ModalNavigation variant="normal">서비스명</ModalNavigation>
          <ModalContent>
            <ModalContentItem>
              <div className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <ModalHeading className="text-center">
                    [서비스명]에 오신 것을 환영합니다!
                  </ModalHeading>
                  <ModalDescription className="text-center">
                    내 이력서는 얼마나 먹힐까 궁금하시지 않나요?
                    <br />
                    이력서 제작부터 피드백 까지 한번에 받아보세요
                  </ModalDescription>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <KakaoLoginButton
                    onClick={() => handleSocialLogin("kakao")}
                  />
                  <GoogleLoginButton
                    onClick={() => handleSocialLogin("google")}
                  />
                  <NaverLoginButton
                    onClick={() => handleSocialLogin("naver")}
                  />
                </div>
              </div>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>

      {/* 로그인 실패 모달 */}
      <Modal
        open={errorOpen}
        onOpenChange={(open) => {
          if (!open) closeError();
        }}
      >
        <ModalContainer
          size="medium"
          disableOutsideClickClose
          aria-label="로그인 실패"
        >
          <ModalNavigation variant="normal">로그인 실패</ModalNavigation>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>로그인에 실패했습니다</ModalHeading>
            </ModalContentItem>
          </ModalContent>
          <ActionArea variant="neutral">
            <ActionAreaButton
              buttonColor="primary"
              onClick={() => {
                closeError();
                setLoginOpen(true);
              }}
            >
              다시 로그인
            </ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>
    </div>
  );
}
