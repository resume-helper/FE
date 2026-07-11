declare global {
  /** 인증 필요 */
  type UNAUTHORIZED = "UNAUTHORIZED";

  interface RESPONSE_MODEL<T> {
    success: boolean;
    data: T;
    message: null | string;
    code: UNAUTHORIZED | string | null;
  }

  interface INFINITY_RESPONSE_ITEM<T> {
    content: T;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

  type API_FAIL_RESPONSE = RESPONSE_MODEL<null>;
}

export {};
