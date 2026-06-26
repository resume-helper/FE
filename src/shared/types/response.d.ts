declare global {
  interface RESPONSE_MODEL<T> {
    success: boolean;
    data: T;
    message: null | string;
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

  type API_FAIL_RESPONSE = {
    code: "UNAUTHORIZED" | string;
    message: string;
    timestamp: string;
  };
}

export {};
