declare global {
  type SORT_TYPE = "NEWEST" | "OLDEST";

  type RESUMSES_TYPES = "WEB" | "PDF";

  interface RESUMSE_LIST_ITEM {
    id: number;
    title: string;
    type: RESUMSES_TYPES;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface API_CLIENT_RESUMSES_LIST_PARAMS {
    offset: number;
    limit: number;
    type: RESUMSES_TYPES;
    sort: SORT_TYPE;
    keyword?: string;
  }

  type API_SERVER_RESUMSES_LIST = RESPONSE_MODEL<
    INFINITY_RESPONSE_ITEM<RESUMSE_LIST_ITEM[]>
  >;

  type API_CLIENT_RESUMSES_LIST = INFINITY_RESPONSE_ITEM<RESUMSE_LIST_ITEM[]>;
}

export {};
