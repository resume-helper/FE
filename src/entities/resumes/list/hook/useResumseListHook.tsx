"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { API_CLIENT_RESUMSES_WEB_LIST } from "../api/api.resumes.web.list";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";

export const useResumseListHook = (type: "WEB" | "PDF", sort: SORT_TYPE) => {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["resumes", "list", type],
    queryFn: ({ pageParam }) =>
      API_CLIENT_RESUMSES_WEB_LIST({
        offset: pageParam,
        limit: 20,
        sort,
        type,
      }),
    initialPageParam: 1,
    getNextPageParam: (response) => {
      if (!response || response instanceof Error) return undefined;

      const { page, hasNext } = response as INFINITY_RESPONSE_ITEM<
        RESUMSE_LIST_ITEM[]
      >;

      if (!hasNext) return undefined;

      return hasNext ? page + 1 : undefined;
    },
  });

  if (isError) {
    LogoutCallback();
  }

  return {
    data,
    latest: data?.pages[0].content?.slice(0, 7),
    total: data?.pages.at(-1)?.totalElements,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
