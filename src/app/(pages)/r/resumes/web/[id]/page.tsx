import ResumeDetailView from "@/features/ResumeDetail/ResumeDetailView";

const ResumesWebDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ResumeDetailView mode="WEB" resumeId={Number(id)} />;
};

export default ResumesWebDetailPage;
