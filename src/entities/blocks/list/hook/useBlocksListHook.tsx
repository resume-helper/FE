"use client";

import { useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";
import { API_CLIENT_BLOCKS_LIST } from "../api/api.client.blocks.list";

export const useBlocksListHook = () => {
  const searchParams = useSearchParams();

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
    queryKey: ["resumes", "list", searchParams.get("searchSort") ?? "ALL"],
    queryFn: async ({ pageParam }) => {
      const params: API_CLIENT_BLOCKS_LIST_PARAMS = {
        offset: pageParam,
        limit: 20,
      };

      if (searchParams.get("searchSort"))
        params["type"] = searchParams.get("searchSort") as BLOCK_TYPE;

      return await API_CLIENT_BLOCKS_LIST(params);
    },
    initialPageParam: 1,
    getNextPageParam: (response) => {
      if (!response || response instanceof Error) return undefined;

      const { page, hasNext } = response as INFINITY_RESPONSE_ITEM<
        BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT>[]
      >;

      if (!hasNext) return undefined;

      return hasNext ? page + 1 : undefined;
    },
  });

  //   if (isError) { LogoutCallback() }

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
