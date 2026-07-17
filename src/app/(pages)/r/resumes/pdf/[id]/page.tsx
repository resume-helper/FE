import ResumeDetailView from "@/features/ResumeDetail/ResumeDetailView";

const ResumesPdfDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ResumeDetailView mode="PDF" resumeId={Number(id)} />;
};

export default ResumesPdfDetailPage;
