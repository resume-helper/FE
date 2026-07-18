declare global {
  interface API_CLIENT_BLOCKS_LIST_PARAMS {
    offset: number;
    limit: number;
    type?: BLOCK_TYPE;
  }

  /** BE BlockCountsResponse */
  interface BLOCK_COUNTS {
    totalCount: number;
    counts: { type: BLOCK_TYPE; count: number }[];
  }

  type BLOCK_LIST_CONTENT =
    | CAREER_BLOCK_ITEM
    | PROJECT_BLOCK_ITEM
    | SKILL_BLOCK_ITEM
    | INTRODUCTION_BLOCK_ITEM
    | SUMMARY_BLOCK_ITEM
    | EDUCATION_BLOCK_ITEM
    | CERTIFICATE_BLOCK_ITEM
    | ACTIVITY_BLOCK_ITEM
    | BASIC_INFO_BLOCK_ITEM;

  interface BLOCK_LIST_ITEM<T> {
    /** 콘텐츠 고유 식별값 */
    id: number;

    /** 블록타입 */
    type: BLOCK_TYPE;

    /** 블록 명 */
    title: string;

    /** 생성일자 */
    createdAt: string;

    /** 수정일자 */
    updatedAt: string;

    contentJson: T;
  }

  type API_SERVER_BLOCKS_LIST = RESPONSE_MODEL<
    INFINITY_RESPONSE_ITEM<BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>[]>
  >;

  type API_CLIENT_BLOCKS_LIST = INFINITY_RESPONSE_ITEM<
    BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>[]
  >;
}

export {};
