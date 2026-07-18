import { NextRequest } from "next/server";

import { API_SERVER_RESUMES_VISIBILITY } from "@/entities/resumes/builder/api/api.server.resumes.builder";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { resumeId, isPublic } =
    (await req.json()) as API_CLIENT_RESUMES_VISIBILITY_PARAMS;

  return withAuthRetry(() => API_SERVER_RESUMES_VISIBILITY(resumeId, isPublic));
}
