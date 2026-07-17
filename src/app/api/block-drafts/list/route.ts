import { NextRequest } from "next/server";

import { API_SERVER_BLOCK_DRAFTS_LIST } from "@/entities/blocks/editor/api/api.server.block.drafts";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { type, currentDraftId } =
    (await req.json()) as API_CLIENT_BLOCK_DRAFTS_LIST_PARAMS;

  return withAuthRetry(() =>
    API_SERVER_BLOCK_DRAFTS_LIST(type, currentDraftId)
  );
}
