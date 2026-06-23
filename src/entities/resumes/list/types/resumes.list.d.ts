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

  interface API_CLIENT_RESUMSES_WEB_LIST_PARAMS {
    offset: number;
    limit: number;
    sort: SORT_TYPE;
    type: RESUMSES_TYPES;
  }

  type API_SERVER_RESUMSES_WEB_LIST = RESPONSE_MODEL<RESUMSE_LIST_ITEM[]>;

  type API_CLIENT_RESUMSES_WEB_LIST = INFINITY_RESPONSE_ITEM<
    RESUMSE_LIST_ITEM[]
  >;
}

export {};
