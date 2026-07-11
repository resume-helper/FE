import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { PrefetchBlocksList } from "@/entities/blocks/list/prefetch/prefetch.blocks.list";
import { PrefetchBlocksCounts } from "@/entities/blocks/counts/prefetch/prefetch.blocks.counts";

import BlocksLibraryListPageView from "./_view";

interface BLOCKS_LIST_PAGE_SERVER {
  searchParams: Promise<{ blockType?: BLOCK_TYPE }>;
}

const BlocksLibraryListPageServer = async ({
  searchParams,
}: BLOCKS_LIST_PAGE_SERVER) => {
  const { blockType } = await searchParams;

  const queryServer = new QueryClient();

  await PrefetchBlocksCounts(queryServer);
  await PrefetchBlocksList(queryServer, blockType);

  const dehydratedState = dehydrate(queryServer);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlocksLibraryListPageView />
    </HydrationBoundary>
  );
};

export default BlocksLibraryListPageServer;
