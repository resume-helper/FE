interface RESUMSES_WEB_DETAIL_PAGE_SERVER {
  params: Promise<{ id: string }>;
}

const ResumesWebDetailPageServer = async ({
  params,
}: RESUMSES_WEB_DETAIL_PAGE_SERVER) => {
  const { id } = await params;

  return <>ResumesWebDetailPageServer {id}</>;
};

export default ResumesWebDetailPageServer;
