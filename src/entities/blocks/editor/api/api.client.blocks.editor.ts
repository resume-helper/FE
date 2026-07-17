import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_BLOCKS_SAVE(
  params: API_CLIENT_BLOCKS_SAVE_PARAMS
) {
  return CLIENT_API("blocks/save", { json: params }).json<BLOCK_SAVE_RESULT>();
}

export async function API_CLIENT_BLOCK_DRAFTS_LIST(
  params: API_CLIENT_BLOCK_DRAFTS_LIST_PARAMS
) {
  return CLIENT_API("block-drafts/list", { json: params }).json<
    BLOCK_DRAFT_SUMMARY[]
  >();
}

export async function API_CLIENT_BLOCK_DRAFTS_GET(draftId: number) {
  return CLIENT_API("block-drafts/get", {
    json: { draftId },
  }).json<BLOCK_DRAFT_DETAIL>();
}

export async function API_CLIENT_BLOCK_DRAFTS_SAVE(
  params: API_CLIENT_BLOCK_DRAFTS_SAVE_PARAMS
) {
  return CLIENT_API("block-drafts/save", {
    json: params,
  }).json<BLOCK_DRAFT_DETAIL>();
}

export async function API_CLIENT_BLOCK_DRAFTS_DELETE(draftId: number) {
  return CLIENT_API("block-drafts/delete", { json: { draftId } }).json<{
    success: boolean;
  }>();
}
