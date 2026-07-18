import { BACKEND_API } from "@/shared/api/api.server.instance";

/** 임시저장 목록 (BE: GET /api/block-drafts?type=&currentDraftId=) */
export async function API_SERVER_BLOCK_DRAFTS_LIST(
  type: BLOCK_TYPE,
  currentDraftId?: number
) {
  const searchParams: Record<string, string | number> = { type };
  if (currentDraftId) searchParams["currentDraftId"] = currentDraftId;

  const api = await BACKEND_API("block-drafts", { searchParams });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_DRAFT_SUMMARY[]>>();
  return response["data"];
}

/** 임시저장 단건 조회 (BE: GET /api/block-drafts/{id}) */
export async function API_SERVER_BLOCK_DRAFTS_GET(draftId: number) {
  const api = await BACKEND_API(`block-drafts/${draftId}`);

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_DRAFT_DETAIL>>();
  return response["data"];
}

/** 임시저장 생성 (BE: POST /api/block-drafts) */
export async function API_SERVER_BLOCK_DRAFTS_CREATE(
  blockType: BLOCK_TYPE,
  title: string,
  contentJson: Record<string, unknown>
) {
  const api = await BACKEND_API("block-drafts", {
    method: "post",
    json: { blockType, title, contentJson },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_DRAFT_DETAIL>>();
  return response["data"];
}

/** 임시저장 덮어쓰기 (BE: PUT /api/block-drafts/{id} — 만료 14일 연장) */
export async function API_SERVER_BLOCK_DRAFTS_UPDATE(
  draftId: number,
  blockType: BLOCK_TYPE,
  title: string,
  contentJson: Record<string, unknown>
) {
  const api = await BACKEND_API(`block-drafts/${draftId}`, {
    method: "put",
    json: { blockType, title, contentJson },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response = await api.json<RESPONSE_MODEL<BLOCK_DRAFT_DETAIL>>();
  return response["data"];
}

/** 임시저장 삭제 (BE: DELETE /api/block-drafts/{id} — 최종 저장 완료 시 자동 삭제용) */
export async function API_SERVER_BLOCK_DRAFTS_DELETE(draftId: number) {
  const api = await BACKEND_API(`block-drafts/${draftId}`, {
    method: "delete",
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  return { success: true };
}
