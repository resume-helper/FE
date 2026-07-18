"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { API_CLIENT_BLOCKS_COUNTS } from "@/entities/blocks/list/api/api.client.blocks.list";
import {
  BLOCK_EDITOR_TYPES,
  BLOCK_TYPE_LABELS,
} from "@/entities/blocks/editor/model/blockEditorMeta";
import { BlocksLibraryList } from "@/features/BlocksLibraryList";
import { Button } from "@/shared/ui/Button";

export const BlockLibraryListBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = searchParams.get("searchSort");

  const { data: counts } = useQuery({
    queryKey: ["blocks", "counts"],
    queryFn: () => API_CLIENT_BLOCKS_COUNTS(),
  });

  const countOf = (type: string) =>
    counts?.counts.find((c) => c.type === type)?.count ?? 0;

  const changeFilter = (type: string | null) => {
    router.replace(type ? `${pathname}?searchSort=${type}` : pathname);
  };

  return (
    <section>
      <h2 className="flex h-[88px] items-center justify-between text-[2rem] font-[600]">
        경험을 블록으로 쌓아두세요.
        <Button as={Link} href={"/r/blocks/add"}>
          블록 생성
        </Button>
      </h2>

      {/* 카테고리 필터탭 (BE GET /api/blocks/counts) */}
      <nav className="mb-[16px] flex flex-wrap gap-[8px]">
        <button
          type="button"
          onClick={() => changeFilter(null)}
          className={`h-[36px] rounded-[8px] border px-[12px] text-[0.875rem] font-[500] ${
            !activeType
              ? "border-[#0066FF] bg-[#0066FF] text-white"
              : "border-[#70737C29] text-[#171719]"
          }`}
        >
          전체 {counts ? counts.totalCount : ""}
        </button>
        {BLOCK_EDITOR_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => changeFilter(type)}
            className={`h-[36px] rounded-[8px] border px-[12px] text-[0.875rem] font-[500] ${
              activeType === type
                ? "border-[#0066FF] bg-[#0066FF] text-white"
                : "border-[#70737C29] text-[#171719]"
            }`}
          >
            {BLOCK_TYPE_LABELS[type]} {counts ? countOf(type) : ""}
          </button>
        ))}
      </nav>

      <BlocksLibraryList />
    </section>
  );
};
