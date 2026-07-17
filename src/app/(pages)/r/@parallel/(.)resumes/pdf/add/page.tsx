"use client";

import { useRouter } from "next/navigation";

import { BackgroundLayer } from "@/shared/ui/BackgroundLayer";

const ResumesPdfAddParallelPageServer = () => {
  const navigation = useRouter();

  function OnClickCancelCallback() {
    navigation.back();
  }

  /** 확인 — 인터셉트 모달을 벗어나 풀페이지 빌더로 진입 (전체 이동으로 인터셉트 해제) */
  function OnClickConfirmCallback() {
    window.location.assign("/r/resumes/pdf/add");
  }

  return (
    <BackgroundLayer>
      <article className="absolute top-1/2 left-1/2 w-[720px] -translate-1/2 rounded-[16px] bg-[#fff] p-[32px]">
        <h2>PDF 이력서 생성</h2>
        <p className="text-label-1-normal-medium text-label-alternative mt-[8px]">
          블록을 조합해 PDF 이력서를 만들어요.
        </p>
        <div className="mt-[19px] flex justify-end gap-[8px] [&>*]:h-[44px] [&>*]:w-[120px] [&>*]:rounded-[12px] [&>*]:font-[600]">
          <button
            onClick={OnClickCancelCallback}
            className="border border-[#70737C29] text-[#171719]"
          >
            취소
          </button>
          <button
            onClick={OnClickConfirmCallback}
            className="bg-[#0066FF] text-[#fff]"
          >
            확인
          </button>
        </div>
      </article>
    </BackgroundLayer>
  );
};

export default ResumesPdfAddParallelPageServer;
