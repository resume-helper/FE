declare global {
  /** BE PublicResumeResponse */
  interface PUBLIC_RESUME {
    id: number;
    title: string;
    template: RESUME_TEMPLATE;
    blocks: RESUME_DETAIL_BLOCK[];
    updatedAt: string;
  }

  interface API_CLIENT_PUBLIC_FEEDBACK_PARAMS {
    resumeId: number;
    section: BLOCK_TYPE | null;
    rating: number | null;
    comment: string | null;
    tags: string[];
  }

  interface API_CLIENT_VIEW_DURATION_PARAMS {
    slug: string;
    sessionId: number;
    totalDurationSec: number;
    sectionDwells: { section: BLOCK_TYPE; dwellSeconds: number }[];
  }
}

export {};
