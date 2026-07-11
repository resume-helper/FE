"use client";

import { useRouter } from "next/navigation";

const ResumesPdfAddPageServer = () => {
  const navigation = useRouter();

  function OnClickCancelCallback() {
    window.history.length > 1 ? navigation.back() : navigation.push("/r");
  }

  return (
    <article className="absolute top-1/2 left-1/2 w-[720px] -translate-1/2 rounded-[16px] bg-[#fff] p-[32px]">
      <h2>PDF 이력서 생성</h2>
      <div className="mt-[19px] flex justify-end gap-[8px] [&>*]:h-[44px] [&>*]:w-[120px] [&>*]:rounded-[12px] [&>*]:font-[600]">
        <button
          onClick={OnClickCancelCallback}
          className="border border-[#70737C29] text-[#171719]"
        >
          취소
        </button>
        <button className="bg-[#0066FF] text-[#fff]">확인</button>
      </div>
    </article>
  );
};

export default ResumesPdfAddPageServer;
