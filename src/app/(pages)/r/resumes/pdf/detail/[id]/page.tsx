interface RESUMSES_PDF_DETAIL_PAGE_SERVER {
  params: Promise<{ id: string }>;
}

const ResumesPdfDetailPageServer = async ({
  params,
}: RESUMSES_PDF_DETAIL_PAGE_SERVER) => {
  const { id } = await params;

  return <>ResumesPDFDetailPageServer {id}</>;
};

export default ResumesPdfDetailPageServer;
