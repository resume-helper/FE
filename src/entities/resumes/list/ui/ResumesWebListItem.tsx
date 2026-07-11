"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useShallow } from "zustand/shallow";

import { useResumsesDeleteStore } from "@/entities/resumes/delete/store/useResumsesDeleteStore";

import { DateFormat } from "@/shared/util/dateFormat";

import { CheckBox } from "@/shared/ui/CheckBox";
import SvgDownload from "@/shared/icons/Download";

interface RESUMES_WEB_LIST_ITEM {
  item: RESUMSE_LIST_ITEM;
}

export const ResumesWebListItem = ({ item }: RESUMES_WEB_LIST_ITEM) => {
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
      navigation.push(`/r/resumes/web/detail/${item.id}`);
    }
  }

  return (
    <li>
      <div
        className="flex h-[94px] cursor-pointer items-center text-[#171719]"
        onClick={OnClickCallback}
      >
        {isDelete && <CheckBox checked={isChecked} className="mr-[15px]" />}
        <p
          className={`mr-[16px] h-[24px] w-[48px] shrink-0 leading-[24px] ${item.isPublic ? "bg-[#EBFAF0] text-[#00BF40]" : "bg-[#FFF0F0] text-[#FF4242]"} rounded-[6px] text-center text-[0.75rem]`}
        >
          {item.isPublic ? "공개" : "비공개"}
        </p>
        <dl className="pt-[16px]">
          <dt className="w-[572px] truncate text-[1.0625rem] font-[500]">
            {item.title}
          </dt>
          <dd className="space-x-[10px] text-[0.8125rem] font-[400] text-[#37383C9C]">
            <span>조회수 842</span>
            <span>체류시간 00초</span>
            <span>별점 4.2</span>
          </dd>
        </dl>
        <div className="ml-auto flex items-center gap-[8px]">
          <p className="text-[0.875rem]">
            {DateFormat(item.createdAt, "yyyy-mm-dd")}
          </p>
          <button title={`${item.title} 이력서 다운로드`}>
            <SvgDownload className="size-[20px]" />
          </button>
        </div>
      </div>
    </li>
  );
};
