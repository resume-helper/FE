"use client";

import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

type SELECT_TYPE = "web" | "pdf";

interface SELECT_RESUMSES_TYPE_BOX {
  cancelCallback: () => void;
}

export const SelectResumesTypeBox = ({
  cancelCallback,
}: SELECT_RESUMSES_TYPE_BOX) => {
  const [isSelected, SetIsSelected] = useState<SELECT_TYPE | "">("");

  const navigation = useRouter();

  function OnClickSubmitCallback() {
    if (!isSelected) return;

    navigation.push(`/r/resumes/${isSelected}/add`);
  }

  return (
    <article className="absolute top-1/2 left-1/2 w-[720px] -translate-1/2 rounded-[16px] bg-[#fff] p-[32px]">
      <h2 className="text-[1.375rem] font-[500]">이력서 포맷 선택</h2>
      <div className="mt-[20px] flex gap-[12px] [&>div]:h-[423px] [&>div]:w-[322px] [&>div]:rounded-[12px] [&>div]:border [&>div]:border-[#70737C29] [&>div]:text-center [&>div.on]:border-[#0066FF] [&>div>img]:inline-block">
        <div
          onClick={() => SetIsSelected("pdf")}
          className={`${isSelected === "pdf" && "on"}`}
        >
          <div className="inline-flex h-[138px] w-[140px] items-center justify-center">
            <Image
              className="mt-[96.5px]"
              width={97}
              height={112}
              loading="lazy"
              src={"/resumes_pdf.png"}
              alt="pdf 이력서 이미지"
            />
          </div>
          <dl>
            <dt className="my-[37px_12px] text-[1.125rem] font-[500]">
              PDF 이력서
            </dt>
            <dd className="px-[25px] text-[0.9375rem] font-[400] break-keep text-[#171719]">
              지원서 제출을 위한 내 이력서를 <br />
              원하는 템플릿에 맞춰 제작해 보세요.
            </dd>
          </dl>
        </div>
        <div
          onClick={() => SetIsSelected("web")}
          className={`${isSelected === "web" && "on"}`}
        >
          <div className="inline-flex h-[138px] w-[140px] items-center justify-center">
            <Image
              className="mt-[102.5px]"
              width={122}
              height={99}
              loading="lazy"
              src={"/resumes_web.png"}
              alt="pdf 이력서 이미지"
            />
          </div>
          <dl>
            <dt className="my-[44px_12px] text-[1.125rem] font-[500]">
              웹 이력서
            </dt>
            <dd className="px-[25px] text-[0.9375rem] font-[400] break-keep text-[#171719]">
              웹 형태로 제작해 사람들에게 <br />
              피드백을 받을 수 있어요.
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-[19px] flex justify-end gap-[8px] [&>button]:h-[44px] [&>button]:w-[120px] [&>button]:rounded-[12px] [&>button]:text-[1rem] [&>button]:font-[600]">
        <Button
          variant={"outlined"}
          onClick={cancelCallback}
          size={"large"}
          disabled={false}
          color={"assistive"}
        >
          취소
        </Button>
        <Button onClick={OnClickSubmitCallback} size={"large"} disabled={false}>
          확인
        </Button>
      </div>
    </article>
  );
};
