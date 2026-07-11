"use client";

import { BlockLibraryFormBox } from "@/widgets/BlockLibraryFormBox";

const BlocksLibraryAddPageView = () => {
  return (
    <>
      <h1 className="sr-only">블록 라이브러리 생성 페이지</h1>
      <div className="pb-[20px]">
        <BlockLibraryFormBox />
      </div>
    </>
  );
};

export default BlocksLibraryAddPageView;
