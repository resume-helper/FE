declare global {
  interface RESUME_BUILDER_BLOCK_INPUT {
    blockId: number;
    orderIndex: number;
  }

  interface API_CLIENT_RESUMES_SAVE_PARAMS {
    title: string;
    type: RESUMSES_TYPES;
    blocks: RESUME_BUILDER_BLOCK_INPUT[];
  }

  /** 저장 결과 — WEB 이력서는 slug 포함 (BFF 가 상세 재조회로 채움) */
  interface RESUME_SAVE_RESULT {
    id: number;
    title: string;
    type: RESUMSES_TYPES;
    isPublic: boolean;
    slug: string | null;
  }

  interface API_CLIENT_RESUMES_VISIBILITY_PARAMS {
    resumeId: number;
    isPublic: boolean;
  }
}

export {};
