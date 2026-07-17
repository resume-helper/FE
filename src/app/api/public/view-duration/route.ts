import { NextRequest } from "next/server";

import { API_SERVER_PUBLIC_VIEW_DURATION } from "@/entities/resumes/public/api/api.server.resumes.public";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const params = (await req.json()) as API_CLIENT_VIEW_DURATION_PARAMS;

  return withAuthRetry(() => API_SERVER_PUBLIC_VIEW_DURATION(params));
}
