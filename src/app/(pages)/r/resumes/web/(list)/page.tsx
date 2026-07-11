import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { PrefetchResumesList } from "@/entities/resumes/list/prefetch/prefetch.resumes.list";
import ResumesWebListPageView from "./_view";

interface RESUMES_WEB_LIST_PAGE_SERVER {
  searchParams: Promise<{ searchSort?: SORT_TYPE; searchKeyword?: string }>;
}

const ResumesWebListPageServer = async ({
  searchParams,
}: RESUMES_WEB_LIST_PAGE_SERVER) => {
  const { searchSort, searchKeyword } = await searchParams;

  const queryServer = new QueryClient();

  const queryKeyObj: {
    sort: SORT_TYPE;
    keyword?: string;
  } = {
    sort: searchSort ?? "NEWEST",
  };

  if (searchKeyword) queryKeyObj["keyword"] = searchKeyword;

  await PrefetchResumesList(queryServer, "WEB", queryKeyObj);

  const dehydratedState = dehydrate(queryServer);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ResumesWebListPageView />
    </HydrationBoundary>
  );
};

export default ResumesWebListPageServer;
