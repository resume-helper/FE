import { NextRequest } from "next/server";

import {
  API_SERVER_BLOCK_DRAFTS_CREATE,
  API_SERVER_BLOCK_DRAFTS_UPDATE,
} from "@/entities/blocks/editor/api/api.server.block.drafts";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { draftId, blockType, title, contentJson } =
    (await req.json()) as API_CLIENT_BLOCK_DRAFTS_SAVE_PARAMS;

  return withAuthRetry(() =>
    draftId
      ? API_SERVER_BLOCK_DRAFTS_UPDATE(draftId, blockType, title, contentJson)
      : API_SERVER_BLOCK_DRAFTS_CREATE(blockType, title, contentJson)
  );
}
