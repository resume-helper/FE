declare global {
  interface RESUME_DETAIL_BLOCK {
    blockId: number;
    orderIndex: number;
    title: string;
    type: BLOCK_TYPE;
    contentJson: string;
  }

  /** BE ResumeDetailResponse */
  interface RESUME_DETAIL {
    id: number;
    title: string;
    type: RESUMSES_TYPES | null;
    template: RESUME_TEMPLATE;
    slug: string | null;
    isPublic: boolean;
    pdfS3Key: string | null;
    pdfDownloadUrl: string | null;
    blocks: RESUME_DETAIL_BLOCK[];
    createdAt: string;
    updatedAt: string;
  }

  /** BE FeedbackResponse */
  interface FEEDBACK_ITEM {
    id: number;
    resumeId: number;
    section: BLOCK_TYPE | null;
    rating: number | null;
    comment: string | null;
    tags: string[];
    createdAt: string;
  }

  interface FEEDBACK_PAGE {
    content: FEEDBACK_ITEM[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

  /** BE FeedbackStatsResponse */
  interface FEEDBACK_STATS {
    totalCount: number;
    overall: {
      count: number;
      averageRating: number | null;
      tagCounts: Record<string, number>;
    };
    sections: {
      section: BLOCK_TYPE;
      count: number;
      averageRating: number | null;
      tagCounts: Record<string, number>;
    }[];
  }

  /** BE ResumeAnalyticsResponse */
  interface RESUME_ANALYTICS {
    totalViews: number;
    uniqueVisitors: number;
    last7Days: { viewCount: number; averageDurationSec: number | null };
    previous7Days: { viewCount: number; averageDurationSec: number | null };
    sectionDwells: { section: BLOCK_TYPE; averageDwellSec: number }[];
  }
}

export {};
