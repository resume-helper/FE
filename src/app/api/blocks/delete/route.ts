import { NextRequest } from "next/server";

import { API_SERVER_BLOCKS_DELETE } from "@/entities/blocks/list/api/api.server.blocks.list";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST(req: NextRequest) {
  const { blockId } = (await req.json()) as { blockId: number };

  return withAuthRetry(() => API_SERVER_BLOCKS_DELETE(blockId));
}
