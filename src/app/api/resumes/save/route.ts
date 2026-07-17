import { NextRequest } from "next/server";

import { API_SERVER_RESUMES_CREATE } from "@/entities/resumes/builder/api/api.server.resumes.builder";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { title, type, blocks } =
    (await req.json()) as API_CLIENT_RESUMES_SAVE_PARAMS;

  return withAuthRetry(() => API_SERVER_RESUMES_CREATE(title, type, blocks));
}
