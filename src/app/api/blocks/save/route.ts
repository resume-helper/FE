import { NextRequest } from "next/server";

import {
  API_SERVER_BLOCKS_CREATE,
  API_SERVER_BLOCKS_UPDATE,
} from "@/entities/blocks/editor/api/api.server.blocks.save";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { blockId, blockType, title, contentJson } =
    (await req.json()) as API_CLIENT_BLOCKS_SAVE_PARAMS;

  return withAuthRetry(() =>
    blockId
      ? API_SERVER_BLOCKS_UPDATE(blockId, blockType, title, contentJson)
      : API_SERVER_BLOCKS_CREATE(blockType, title, contentJson)
  );
}
