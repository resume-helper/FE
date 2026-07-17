import { NextRequest } from "next/server";

import { API_SERVER_RESUMES_DETAIL } from "@/entities/resumes/detail/api/api.server.resumes.detail";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { resumeId } = (await req.json()) as { resumeId: number };

  return withAuthRetry(() => API_SERVER_RESUMES_DETAIL(resumeId));
}
