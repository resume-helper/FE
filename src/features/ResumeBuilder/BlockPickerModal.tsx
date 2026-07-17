"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { API_CLIENT_BLOCKS_LIST } from "@/entities/blocks/list/api/api.client.blocks.list";
import {
  BLOCK_EDITOR_TYPES,
  BLOCK_TYPE_LABELS,
} from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";

const PICKER_PAGE_SIZE = 100;

/** 블록 불러오기 모달 (기획 9.2.1~9.2.2 — 카테고리 필터 + 불러오기) */
export function BlockPickerModal({
  initialType,
  excludedIds,
  onClose,
  onPick,
}: {
  initialType?: EditorBlockType;
  /** 이미 불러온 블록은 목록에서 제외 */
  excludedIds: number[];
  onClose: () => void;
  onPick: (block: BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>) => void;
}) {
  const [filter, setFilter] = useState<EditorBlockType | "ALL">(
    initialType ?? "ALL"
  );

  const { data, isLoading } = useQuery({
    queryKey: ["blockPicker", filter],
    queryFn: () =>
      API_CLIENT_BLOCKS_LIST({
        offset: 1,
        limit: PICKER_PAGE_SIZE,
        type: filter === "ALL" ? undefined : filter,
      }),
  });

  const blocks = (data?.content ?? []).filter(
    (b) => !excludedIds.includes(b.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="flex max-h-[560px] w-[520px] flex-col gap-[16px] overflow-hidden rounded-[16px] bg-white p-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-heading-2-bold">블록 불러오기</h3>

        <div className="flex flex-wrap gap-[6px]">
          {(["ALL", ...BLOCK_EDITOR_TYPES] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`text-label-2-medium h-[30px] rounded-[8px] border px-[10px] ${
                filter === type
                  ? "border-primary-normal bg-primary-normal text-white"
                  : "border-line-normal-normal text-label-normal"
              }`}
            >
              {type === "ALL" ? "전체" : BLOCK_TYPE_LABELS[type]}
            </button>
          ))}
        </div>

        <ul className="flex flex-1 flex-col gap-[8px] overflow-y-auto">
          {isLoading && (
            <li className="text-label-1-normal-medium">불러오는 중…</li>
          )}
          {!isLoading && blocks.length === 0 && (
            <li className="text-label-1-normal-medium text-label-alternative">
              불러올 블록이 없어요
            </li>
          )}
          {blocks.map((block) => (
            <li key={block.id}>
              <button
                type="button"
                className="border-line-normal-normal flex w-full items-center justify-between rounded-[8px] border p-[12px] text-left hover:bg-[#f4f4f5]"
                onClick={() => onPick(block)}
              >
                <span className="flex flex-col">
                  <span className="text-body-1-normal-medium">
                    {block.title}
                  </span>
                  <span className="text-label-2-medium text-label-alternative">
                    {BLOCK_TYPE_LABELS[block.type as EditorBlockType] ??
                      block.type}
                  </span>
                </span>
                <span className="text-label-1-normal-medium text-primary-normal">
                  불러오기
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="h-[44px] rounded-[12px] border border-[#70737C29] font-[600] text-[#171719]"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
