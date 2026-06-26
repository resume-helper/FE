"use client";

import { DateFormat } from "@/shared/util/dateFormat";

import { CheckBox } from "@/shared/ui/CheckBox";
import SvgDownload from "@/shared/icons/Download";

interface RESUMES_PDF_LIST_ITEM {
  item: RESUMSE_LIST_ITEM;
  isDelete: boolean;
  // onChangeCheckCallback : (checked : boolean,id : number) => void
}

export const ResumsePdfListItem = ({
  item,
  isDelete,
}: RESUMES_PDF_LIST_ITEM) => {
  function OnChangeCallback(e: React.InputEvent<HTMLInputElement>) {
    const self = e.currentTarget;

    const is = self.checked as boolean;

    console.log(is);
    // onChangeCheckCallback(is, item.id);
  }

  return (
    <li className="flex h-[88px] items-center justify-between [&:nth-child(n+2)]:border-t [&:nth-child(n+2)]:border-t-[#F4F4F5]">
      {isDelete && (
        <CheckBox
          onClick={(e) => {
            console.log(e);
          }}
        />
      )}
      <h3 className="w-[721px] truncate text-[1.0625rem]">{item.title}</h3>
      <div className="flex items-start gap-[10px]">
        <p>{DateFormat(item.createdAt, "yyyy-mm-dd")}</p>
        <button title={`이력서 다운로드`}>
          <SvgDownload className="size-[20px]" />
        </button>
      </div>
    </li>
  );
};
