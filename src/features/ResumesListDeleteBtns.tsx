"use client";

import { useResumesListDeleteStore } from "@/entities/resumes/list/store/useResumesListDeleteStore";

import { Button } from "@/shared/ui/Button";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

interface RESUMES_LIST_DELETE_BTNS extends COMPONENT_CLASS_NAME {}

export const ResumesListDeleteBtns = ({
  className,
}: RESUMES_LIST_DELETE_BTNS) => {
  const { SetIsDelete, isDelete } = useResumesListDeleteStore(
    useShallow((state) => ({
      SetIsDelete: state.SetIsDelete,
      isDelete: state.isDelete,
    }))
  );

  return (
    <div className={twMerge("flex items-center gap-[16px]", className ?? "")}>
      {isDelete ? (
        <>
          <Button
            onClick={() => SetIsDelete(false)}
            className="w-[28px] border-none text-[#37383C9C]"
            variant={"outlined"}
            trailingIcon={false}
            color={"assistive"}
            size={"medium"}
          >
            취소
          </Button>
          <Button variant={"outlined"} color={"assistive"} size={"medium"}>
            삭제
          </Button>
        </>
      ) : (
        <Button
          onClick={() => SetIsDelete(true)}
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
