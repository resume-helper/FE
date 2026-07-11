declare global {
  interface TYPE_COUNTS_ITEM {
    /** 블록 타입 */
    type: BLOCK_TYPE;

    /** 타입별 등록한 블록 수 */
    count: number;
  }

  interface BLOCKS_COUNTS_ITEM {
    /** 등록한 블록 전체 개수 */
    totalCount: number;

    counts: TYPE_COUNTS_ITEM[];
  }

  type API_SERVER_BLOCKS_COUNTS = RESPONSE_MODEL<BLOCKS_COUNTS_ITEM>;

  type API_CLIENT_BLOCKS_COUNTS = BLOCKS_COUNTS_ITEM;
}

export {};
