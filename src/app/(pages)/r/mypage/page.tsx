"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  API_CLIENT_MYPAGE_ME,
  API_CLIENT_MYPAGE_WITHDRAW,
} from "@/entities/auth/mypage/api/api.client.mypage";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";
import { useAlertStore } from "@/shared/store/alertStore";

const PROVIDER_LABELS: Record<SOCIAL_PROVIDER, string> = {
  KAKAO: "카카오",
  GOOGLE: "구글",
  NAVER: "네이버",
};

/** 마이페이지 (기획 화면 13 — 연결 소셜계정 표시 + 회원 탈퇴) */
const MyPage = () => {
  const showAlert = useAlertStore((s) => s.show);

  const { data: me, isLoading } = useQuery({
    queryKey: ["mypageMe"],
    queryFn: () => API_CLIENT_MYPAGE_ME(),
  });

  const withdraw = useMutation({
    mutationFn: (provider: SOCIAL_PROVIDER) =>
      API_CLIENT_MYPAGE_WITHDRAW(provider),
    onSuccess: () => LogoutCallback(),
  });

  const onWithdrawClick = async () => {
    const provider = me?.socialAccounts.find((a) => a.isActive)?.provider;
    if (!provider) return;
    const result = await showAlert({
      title: "정말 탈퇴할까요?",
      content:
        "탈퇴 즉시 계정이 비활성화돼요. 30일 이내 재가입하면 복구되고, 이후엔 영구 삭제돼요.",
      confirm: { label: "탈퇴", variant: "negative" },
      cancel: { label: "취소" },
    });
    if (result === "confirm") withdraw.mutate(provider);
  };

  if (isLoading || !me) {
    return (
      <section className="text-label-1-normal-medium text-label-alternative p-[32px]">
        불러오는 중…
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-[640px] flex-col gap-[24px] p-[32px]">
      <h2 className="text-heading-1-bold">마이페이지</h2>

      <div className="border-line-normal-normal flex flex-col gap-[12px] rounded-[16px] border p-[20px]">
        <h3 className="text-body-1-normal-bold">연결된 소셜 계정</h3>
        {me.socialAccounts.length === 0 && (
          <p className="text-label-1-normal-medium text-label-alternative">
            연결된 소셜 계정이 없어요
          </p>
        )}
        <ul className="flex flex-col gap-[8px]">
          {me.socialAccounts.map((account) => (
            <li
              key={account.provider}
              className="flex items-center justify-between rounded-[10px] bg-[#f7f7f8] px-[14px] py-[12px]"
            >
              <span className="flex flex-col">
                <span className="text-body-1-normal-medium">
                  {PROVIDER_LABELS[account.provider]}
                </span>
                <span className="text-label-2-medium text-label-alternative">
                  {me.email}
                </span>
              </span>
              <span
                className={`text-label-2-medium rounded-[6px] px-[8px] py-[2px] ${
                  account.isActive
                    ? "bg-[#e6f4ea] text-[#16a34a]"
                    : "text-label-alternative bg-[#f0f0f2]"
                }`}
              >
                {account.isActive ? "연결됨" : "해제됨"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onWithdrawClick}
          disabled={withdraw.isPending}
          className="text-label-1-normal-medium text-label-alternative underline"
        >
          회원 탈퇴
        </button>
      </div>
    </section>
  );
};

export default MyPage;
