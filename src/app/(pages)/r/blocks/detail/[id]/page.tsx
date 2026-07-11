import BlocksLibraryDetailPageView from "./_view";

interface BLOCKS_LIBRARY_DETAIL_PAGE_SERVER {
  params: Promise<{ id: string }>;
}

const BlocksLibraryDetailPageServer = async ({
  params,
}: BLOCKS_LIBRARY_DETAIL_PAGE_SERVER) => {
  const { id } = await params;

  return (
    <>
      {id}
      <BlocksLibraryDetailPageView />
    </>
  );
};

export default BlocksLibraryDetailPageServer;
