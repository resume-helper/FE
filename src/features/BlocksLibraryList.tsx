"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { API_CLIENT_BLOCKS_DELETE } from "@/entities/blocks/list/api/api.client.blocks.list";
import { BLOCK_TYPE_LABELS } from "@/entities/blocks/editor/model/blockEditorMeta";
import { useBlocksListHook } from "@/entities/blocks/list/hook/useBlocksListHook";
import { useAlertStore } from "@/shared/store/alertStore";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { List } from "@/shared/ui/ListCell";
import { Spinner } from "@/shared/ui/Spinner";
import { DateFormat } from "@/shared/util/dateFormat";
import { summarize } from "@/features/ResumeBuilder/preview";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";

/** 수정 진입 시 목록 아이템을 에디터로 넘기는 sessionStorage 키 (BE 단건 조회 API 부재) */
export const BLOCK_EDIT_STASH_KEY = "resumate:block-edit";

export const BlocksLibraryList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showAlert = useAlertStore((s) => s.show);
  const { total, data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useBlocksListHook();

  const onEditClick = (item: BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>) => {
    window.sessionStorage.setItem(BLOCK_EDIT_STASH_KEY, JSON.stringify(item));
    router.push("/r/blocks/add?edit=1");
  };

  const onDeleteClick = async (item: BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>) => {
    const result = await showAlert({
      title: "블록을 삭제할까요?",
      content: "삭제 후 복구가 불가능해요.",
      confirm: { label: "삭제", variant: "negative" },
      cancel: { label: "취소" },
    });
    if (result !== "confirm") return;

    await API_CLIENT_BLOCKS_DELETE(item.id);
    queryClient.invalidateQueries({ queryKey: ["resumes", "list"] });
    queryClient.invalidateQueries({ queryKey: ["blocks", "counts"] });
  };

  const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
    threshold: 0,
  });

  useEffect(() => {
    if (!isView) return;
    if (isLoading) return;
    if (total === 0) return;
    if (isFetching) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [isView]);

  return (
    <List className="mb-[20px] flex-row flex-wrap gap-[12px]">
      {data?.pages.map((page) => {
        const list = page.content;

        return list?.map((el, i) => {
          const preview = summarize(
            el.type as EditorBlockType,
            el.contentJson as unknown as Record<string, unknown>
          );
          const previewBody = (preview as { body?: string } | undefined)?.body;
          const previewSubtitle = (preview as { subtitle?: string } | undefined)
            ?.subtitle;

          return (
            <li
              className="relative h-[186px] w-[calc(50%-6px)] cursor-pointer rounded-[12px] bg-[#fff] p-[20px_24px] transition-shadow hover:shadow-[0px_4px_12px_0px_#17171714]"
              key={`블록라이브러리-${el.title}-${i}`}
              onClick={() => onEditClick(el)}
            >
              <h3 className="flex gap-[8px] truncate">
                <span className="h-[20px] shrink-0 rounded-[6px] bg-[#EBF7F9] px-[_11px] text-center text-[0.6875rem] leading-[24px] font-[500] text-[#0098B2]">
                  {BLOCK_TYPE_LABELS[
                    el.type as keyof typeof BLOCK_TYPE_LABELS
                  ] ?? el.type}
                </span>
                {el.title}
              </h3>

              {/* 내용 프리뷰 — 대표 필드 요약 (부제 1줄 + 본문 2줄) */}
              <div className="mt-[8px] flex flex-col gap-[2px]">
                {previewSubtitle && (
                  <p className="truncate text-[0.8125rem] text-[#37383C9C]">
                    {previewSubtitle}
                  </p>
                )}
                {previewBody && (
                  <p className="line-clamp-2 text-[0.8125rem] text-[#2E2F33E0]">
                    {previewBody}
                  </p>
                )}
              </div>

              <p className="absolute bottom-[20px] left-[24px] text-[0.875rem] text-[#37383C9C]">
                {DateFormat(el.createdAt, "yyyy-mm-dd")}
              </p>

              <div className="absolute right-[24px] bottom-[20px] flex gap-[12px] text-[0.875rem]">
                <button
                  type="button"
                  className="text-[#37383C9C] underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(el);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="text-[#FF4242] underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(el);
                  }}
                >
                  삭제
                </button>
              </div>
            </li>
          );
        });
      })}
      {/* {Array.from({ length: 7 }).map((_, i) => {
        return (
          <li
            className="w-[calc(50%-6px)] p-[20px_24px] bg-[#fff]"
            key={`블록라이브러리-더미-${i}`}
          >
            <h3 className="flex">
              <span className="shrink-0 w-[62px] h-[20px] rounded-[6px] bg-[#EBF7F9] text-center text-[0.75rem] leading-[24px] text-[#0098B2]">
                경력
              </span>       
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis atque ab, reiciendis non iste impedit? Iusto, iure.
                Assumenda dignissimos repellendus minima eius? Nisi vero odio
                esse exercitationem obcaecati quam amet.       
            </h3>
          </li>
        );
      })} */}

      {isLoading ||
        (isFetching && (
          <li>
            <Spinner className="absolute bottom-[0px] left-1/2 -translate-1/2" />
          </li>
        ))}
      <li ref={ref} style={{ height: "1px" }}></li>
    </List>
  );
};
