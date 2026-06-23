"use client";

export const BlockLibraryEmpty = () => {
  return (
    <li className="mt-[204px] text-center">
      <dl>
        <dt className="text-[1.0625rem] font-[500]">작성된 블록이 없어요.</dt>
        <dd className="mt-[4px] text-[0.9375rem] text-[#2E2F33E0]">
          경험을 블록을 정리해보세요.
        </dd>
      </dl>
      <button
        onClick={() => alert("페이지 이동")}
        className="mt-[16px] h-[32px] w-[78px] rounded-[8px] bg-[#F4F4F5] text-[0.8125rem] font-[500] text-[#2E2F33E0]"
      >
        블록 생성
      </button>
    </li>
  );
};
