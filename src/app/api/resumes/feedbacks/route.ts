import { NextRequest } from "next/server";

import { API_SERVER_RESUMES_FEEDBACKS } from "@/entities/resumes/detail/api/api.server.resumes.detail";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { resumeId, page, size } = (await req.json()) as {
    resumeId: number;
    page: number;
    size: number;
  };

  return withAuthRetry(() =>
    API_SERVER_RESUMES_FEEDBACKS(resumeId, page, size)
  );
}
