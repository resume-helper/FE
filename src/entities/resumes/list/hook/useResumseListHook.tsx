"use client";

import { useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";

import { API_CLIENT_RESUMSES_LIST } from "../api/api.client.resumes.list";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";

export const useResumseListHook = (type: "WEB" | "PDF") => {
  const searchParams = useSearchParams();

  const queryKey: {
    keyword?: string;
    sort: SORT_TYPE;
  } = {
    sort: (searchParams.get("searchSort") as SORT_TYPE) ?? "NEWEST",
  };

  if (searchParams.get("searchKeyword"))
    queryKey["keyword"] = searchParams.get("searchKeyword") as string;

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
    queryKey: ["resumes", "list", type, queryKey],
    queryFn: async ({ pageParam }) =>
      API_CLIENT_RESUMSES_LIST({
        offset: pageParam,
        limit: 20,
        type,
        ...queryKey,
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
