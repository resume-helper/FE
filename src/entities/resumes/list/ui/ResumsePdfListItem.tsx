"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useShallow } from "zustand/shallow";

import { useResumsesDeleteStore } from "@/entities/resumes/delete/store/useResumsesDeleteStore";

import { DateFormat } from "@/shared/util/dateFormat";

import { CheckBox } from "@/shared/ui/CheckBox";
import SvgDownload from "@/shared/icons/Download";

interface RESUMES_PDF_LIST_ITEM {
  item: RESUMSE_LIST_ITEM;
}

export const ResumsePdfListItem = ({ item }: RESUMES_PDF_LIST_ITEM) => {
  const [isChecked, SetIsChecked] = useState(false);

  const navigation = useRouter();

  const { isDelete, CheckedDeleteIdsCallback } = useResumsesDeleteStore(
    useShallow((state) => ({
      isDelete: state.isDelete,
      CheckedDeleteIdsCallback: state.CheckedDeleteIdsCallback,
    }))
  );

  function OnClickCallback() {
    if (isDelete) {
      const checked = !isChecked;

      CheckedDeleteIdsCallback(item.id, checked);
      SetIsChecked(checked);
    } else {
      navigation.push(`/r/resumes/pdf/detail/${item.id}`);
    }
  }

  return (
    <li className="[&:nth-child(n+2)]:border-t [&:nth-child(n+2)]:border-t-[#F4F4F5]">
      <div
        onClick={OnClickCallback}
        className="flex h-[88px] w-full cursor-pointer items-center justify-between"
      >
        {isDelete && <CheckBox checked={isChecked} className="mr-[15px]" />}
        <h3 className="w-[721px] truncate text-left text-[1.0625rem]">
          {item.title}
        </h3>
        <div className="flex items-start gap-[10px]">
          <p className="text-[0.875rem]">
            {DateFormat(item.createdAt, "yyyy-mm-dd")}
          </p>
          <button title={`이력서 다운로드`}>
            <SvgDownload className="size-[20px]" />
          </button>
        </div>
      </div>
    </li>
  );
};
