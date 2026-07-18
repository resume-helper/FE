import { NextRequest } from "next/server";

import { API_SERVER_PUBLIC_FEEDBACK } from "@/entities/resumes/public/api/api.server.resumes.public";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
}

export async function POST(req: NextRequest) {
  const params = (await req.json()) as API_CLIENT_PUBLIC_FEEDBACK_PARAMS;

  return withAuthRetry(() => API_SERVER_PUBLIC_FEEDBACK(params, clientIp(req)));
}
