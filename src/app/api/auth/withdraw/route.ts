import { NextRequest } from "next/server";

import { API_SERVER_MYPAGE_WITHDRAW } from "@/entities/auth/mypage/api/api.server.mypage";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { provider } = (await req.json()) as { provider: SOCIAL_PROVIDER };

  return withAuthRetry(() => API_SERVER_MYPAGE_WITHDRAW(provider));
}
