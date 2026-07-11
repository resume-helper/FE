"use client";

import { useResumesDeleteHook } from "@/entities/resumes/delete/hook/useResumesDeleteHook";
import { useResumsesDeleteStore } from "@/entities/resumes/delete/store/useResumsesDeleteStore";

import { Button } from "@/shared/ui/Button";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

interface RESUMES_LIST_DELETE_BTNS extends COMPONENT_CLASS_NAME {
  type: "WEB" | "PDF";
}

export const ResumesListDeleteBtns = ({
  type,
  className,
}: RESUMES_LIST_DELETE_BTNS) => {
  const { ToggleResumsesDelete, isDelete, deleteIds } = useResumsesDeleteStore(
    useShallow((state) => ({
      ToggleResumsesDelete: state.ToggleResumsesDelete,
      isDelete: state.isDelete,
      deleteIds: state.deleteIds,
    }))
  );

  const { SubmitDeleteResumseCallback } = useResumesDeleteHook(type);

  function OnClickDeleteSubmitCallback() {
    const ids = [...deleteIds].map((el) => el[0]);

    if (ids.length <= 0) return;

    SubmitDeleteResumseCallback(ids);
  }

  return (
    <div className={twMerge("flex items-center gap-[16px]", className ?? "")}>
      {isDelete ? (
        <>
          <Button
            onClick={() => ToggleResumsesDelete(false)}
            className="w-[28px] border-none text-[#37383C9C]"
            variant={"outlined"}
            trailingIcon={false}
            color={"assistive"}
            size={"medium"}
          >
            취소
          </Button>
          <Button
            onClick={OnClickDeleteSubmitCallback}
            variant={"outlined"}
            color={"assistive"}
            size={"medium"}
          >
            삭제
          </Button>
        </>
      ) : (
        <Button
          onClick={() => ToggleResumsesDelete(true)}
          variant={"outlined"}
          color={"assistive"}
          size={"medium"}
        >
          선택
        </Button>
      )}
    </div>
  );
};
