"use client";

import { useQueryClient } from "@tanstack/react-query";

import { API_CLIENT_RESUMES_DELETE } from "@/entities/resumes/detail/api/api.client.resumes.detail";
import { useResumesListDeleteStore } from "@/entities/resumes/list/store/useResumesListDeleteStore";
import { useAlertStore } from "@/shared/store/alertStore";

import { Button } from "@/shared/ui/Button";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

type RESUMES_LIST_DELETE_BTNS = COMPONENT_CLASS_NAME;

export const ResumesListDeleteBtns = ({
  className,
}: RESUMES_LIST_DELETE_BTNS) => {
  const queryClient = useQueryClient();
  const showAlert = useAlertStore((s) => s.show);
  const { SetIsDelete, isDelete, delelteIds } = useResumesListDeleteStore(
    useShallow((state) => ({
      SetIsDelete: state.SetIsDelete,
      isDelete: state.isDelete,
      delelteIds: state.delelteIds,
    }))
  );

  const onDeleteClick = async () => {
    const ids = [...delelteIds.keys()];
    if (ids.length === 0) return;

    const result = await showAlert({
      title: `이력서 ${ids.length}개를 삭제할까요?`,
      content: "삭제 후 복구가 불가능해요.",
      confirm: { label: "삭제", variant: "negative" },
      cancel: { label: "취소" },
    });
    if (result !== "confirm") return;

    await API_CLIENT_RESUMES_DELETE(ids);
    queryClient.invalidateQueries({ queryKey: ["resumes", "list"] });
    SetIsDelete(false);
  };

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
          <Button
            onClick={onDeleteClick}
            disabled={delelteIds.size === 0}
            variant={"outlined"}
            color={"assistive"}
            size={"medium"}
          >
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
