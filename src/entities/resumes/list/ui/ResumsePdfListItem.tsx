"use client";

import Link from "next/link";

import { useShallow } from "zustand/shallow";

import { DateFormat } from "@/shared/util/dateFormat";

import { CheckBox } from "@/shared/ui/CheckBox";
import SvgDownload from "@/shared/icons/Download";
import { useResumesListDeleteStore } from "@/entities/resumes/list/store/useResumesListDeleteStore";

interface RESUMES_PDF_LIST_ITEM {
  item: RESUMSE_LIST_ITEM;
  isDelete: boolean;
}

export const ResumsePdfListItem = ({
  item,
  isDelete,
}: RESUMES_PDF_LIST_ITEM) => {
  const { delelteIds, CheckDeleteIdsCallback } = useResumesListDeleteStore(
    useShallow((state) => ({
      delelteIds: state.delelteIds,
      CheckDeleteIdsCallback: state.CheckDeleteIdsCallback,
    }))
  );

  return (
    <li className="flex h-[88px] items-center justify-between [&:nth-child(n+2)]:border-t [&:nth-child(n+2)]:border-t-[#F4F4F5]">
      {isDelete && (
        <CheckBox
          checked={delelteIds.has(item.id)}
          onCheckedChange={(checked) =>
            CheckDeleteIdsCallback(checked === true, item.id)
          }
        />
      )}
      <h3 className="w-[721px] truncate text-[1.0625rem]">
        <Link href={`/r/resumes/pdf/${item.id}`}>{item.title}</Link>
      </h3>
      <div className="flex items-start gap-[10px]">
        <p>{DateFormat(item.createdAt, "yyyy-mm-dd")}</p>
        <button title={`이력서 다운로드`}>
          <SvgDownload className="size-[20px]" />
        </button>
      </div>
    </li>
  );
};
