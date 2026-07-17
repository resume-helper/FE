import { NextRequest } from "next/server";

import { API_SERVER_RESUMES_DELETE } from "@/entities/resumes/detail/api/api.server.resumes.detail";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { resumeIds } = (await req.json()) as { resumeIds: number[] };

  return withAuthRetry(() => API_SERVER_RESUMES_DELETE(resumeIds));
}
