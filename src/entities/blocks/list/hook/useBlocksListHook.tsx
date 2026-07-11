"use client";

import { useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";

import { API_CLIENT_BLOCKS_LIST } from "../api/api.client.blocks.list";
import { LogoutCallback } from "@/entities/auth/social-login/util/logout";

export const useBlocksListHook = () => {
  const searchParams = useSearchParams();

  const key = searchParams.get("blockType");

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
    queryKey: ["blocks", "list", key ?? "ALL"],
    queryFn: async ({ pageParam }) => {
      const params: API_CLIENT_BLOCKS_LIST_PARAMS = {
        offset: pageParam,
        limit: 20,
      };

      if (key) params["type"] = key as BLOCK_TYPE;

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

  // if (isError) { LogoutCallback() }

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
