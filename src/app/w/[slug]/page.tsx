import PublicResumeView from "@/features/PublicResume/PublicResumeView";

/** 웹 이력서 외부 열람 (비로그인 공개 라우트 — 기획 화면 11) */
const PublicResumePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return <PublicResumeView slug={slug} />;
};

export default PublicResumePage;
