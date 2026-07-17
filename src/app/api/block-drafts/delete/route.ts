import { NextRequest } from "next/server";

import { API_SERVER_BLOCK_DRAFTS_DELETE } from "@/entities/blocks/editor/api/api.server.block.drafts";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { draftId } = (await req.json()) as { draftId: number };

  return withAuthRetry(() => API_SERVER_BLOCK_DRAFTS_DELETE(draftId));
}
