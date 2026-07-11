import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { PrefetchResumesList } from "@/entities/resumes/list/prefetch/prefetch.resumes.list";
import ResumeHelperDashboardPageView from "./_view";
import { PrefetchBlocksList } from "@/entities/blocks/list/prefetch/prefetch.blocks.list";

const ResumeHelperDashboardPageServer = async () => {
  const queryServer = new QueryClient();

  await PrefetchResumesList(queryServer, "PDF", { sort: "NEWEST" });
  await PrefetchBlocksList(queryServer);

  const dehydratedState = dehydrate(queryServer);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ResumeHelperDashboardPageView />
    </HydrationBoundary>
  );
};

export default ResumeHelperDashboardPageServer;
