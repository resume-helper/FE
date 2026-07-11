import { useQuery } from "@tanstack/react-query";
import { API_CLIENT_BLOCKS_COUNTS } from "../api/api.client.blocks.counts";

export const useBlocksCountsHook = () => {
  const { data } = useQuery({
    queryKey: ["blocks", "list", "counts"],
    queryFn: API_CLIENT_BLOCKS_COUNTS,
  });

  return {
    totalCount: data?.totalCount ?? 0,
    counts: new Map<BLOCK_TYPE, number>(
      data?.counts.map((el) => [el.type, el.count])
    ),
  };
};
