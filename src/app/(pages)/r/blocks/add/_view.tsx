"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BlockEditorView from "@/features/BlockEditor/BlockEditorView";
import { BLOCK_EDIT_STASH_KEY } from "@/features/BlocksLibraryList";

const BlocksLibraryAddPageView = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"pending" | "create" | "edit">("pending");
  const [editBlock, setEditBlock] =
    useState<BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT> | null>(null);

  // 수정 진입: 목록에서 sessionStorage 로 전달 (BE 단건 조회 API 부재). 유실 시 목록으로 복귀.
  // SSR 히드레이션 불일치를 피하려면 클라이언트 마운트 후 1회 읽어야 한다 — 마운트 초기화라 캐스케이드 없음
  useEffect(() => {
    const isEdit =
      new URLSearchParams(window.location.search).get("edit") === "1";
    if (!isEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode("create");
      return;
    }
    const raw = window.sessionStorage.getItem(BLOCK_EDIT_STASH_KEY);
    if (!raw) {
      router.replace("/r/blocks");
      return;
    }
    setEditBlock(JSON.parse(raw) as BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>);
    setMode("edit");
  }, [router]);

  if (mode === "pending") return null;

  return <BlockEditorView editBlock={editBlock} />;
};

export default BlocksLibraryAddPageView;
