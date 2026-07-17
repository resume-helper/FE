import { NextRequest } from "next/server";

import { API_SERVER_PUBLIC_RESUME } from "@/entities/resumes/public/api/api.server.resumes.public";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { slug } = (await req.json()) as { slug: string };

  return withAuthRetry(() => API_SERVER_PUBLIC_RESUME(slug));
}
