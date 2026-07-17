import { NextRequest } from "next/server";

import { API_SERVER_PUBLIC_VIEW_SESSION } from "@/entities/resumes/public/api/api.server.resumes.public";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
}

export async function POST(req: NextRequest) {
  const { slug } = (await req.json()) as { slug: string };

  return withAuthRetry(() =>
    API_SERVER_PUBLIC_VIEW_SESSION(slug, clientIp(req))
  );
}
