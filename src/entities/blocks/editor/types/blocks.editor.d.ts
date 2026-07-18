declare global {
  /** 블록 저장 (생성·수정 겸용 — blockId 있으면 수정) */
  interface API_CLIENT_BLOCKS_SAVE_PARAMS {
    blockId?: number;
    blockType: BLOCK_TYPE;
    title: string;
    contentJson: Record<string, unknown>;
  }

  interface BLOCK_SAVE_RESULT {
    id: number;
    type: BLOCK_TYPE;
    title: string;
  }

  /** 임시저장 목록 항목 (BE BlockDraftSummaryResponse) */
  interface BLOCK_DRAFT_SUMMARY {
    id: number;
    title: string;
    updatedAt: string;
    isActive: boolean;
  }

  /** 임시저장 상세 (BE BlockDraftResponse) */
  interface BLOCK_DRAFT_DETAIL {
    id: number;
    blockType: BLOCK_TYPE;
    title: string;
    contentJson: Record<string, unknown>;
    expiresAt: string;
  }

  interface API_CLIENT_BLOCK_DRAFTS_LIST_PARAMS {
    type: BLOCK_TYPE;
    currentDraftId?: number;
  }

  /** 임시저장 저장 (생성·덮어쓰기 겸용 — draftId 있으면 덮어쓰기) */
  interface API_CLIENT_BLOCK_DRAFTS_SAVE_PARAMS {
    draftId?: number;
    blockType: BLOCK_TYPE;
    title: string;
    contentJson: Record<string, unknown>;
  }
}

export {};
