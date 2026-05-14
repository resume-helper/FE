type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  tags?: string[];
  revalidate?: number | false;
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// access_token 만료 시 refresh_token으로 갱신
async function refreshToken(): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("refresh failed");
}

// 공통 fetch 래퍼
async function request<T>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers,
    tags,
    revalidate,
    _retry,
  }: RequestOptions = {}
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      next: {
        ...(tags && { tags }),
        ...(revalidate !== undefined && { revalidate }),
      },
    });
  } catch (e) {
    throw e;
  }

  // 401이고 첫 시도일 때만 토큰 갱신 후 재시도
  if (res.status === 401 && !_retry) {
    try {
      await refreshToken();
      return request<T>(endpoint, {
        method,
        body,
        headers,
        tags,
        revalidate,
        _retry: true,
      });
    } catch {
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

// HTTP 메서드별 shorthand
export const api = {
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method">
  ) => request<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(endpoint, { ...options, method: "DELETE" }),
};
