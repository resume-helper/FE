import { API_SERVER_BLOCKS_COUNTS } from "@/entities/blocks/list/api/api.server.blocks.list";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST() {
  return withAuthRetry(() => API_SERVER_BLOCKS_COUNTS());
}
