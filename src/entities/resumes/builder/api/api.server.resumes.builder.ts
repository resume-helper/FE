import { BACKEND_API } from "@/shared/api/api.server.instance";

interface RESUME_DETAIL_MODEL {
  id: number;
  title: string;
  type: RESUMSES_TYPES;
  slug: string | null;
  isPublic: boolean;
}

/** 이력서 생성 (BE: POST /api/resumes) — WEB 은 slug 확보를 위해 상세를 재조회한다 */
export async function API_SERVER_RESUMES_CREATE(
  title: string,
  type: RESUMSES_TYPES,
  blocks: RESUME_BUILDER_BLOCK_INPUT[]
): Promise<RESUME_SAVE_RESULT> {
  const api = await BACKEND_API("resumes", {
    method: "post",
    json: { title, type, blocks },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const created =
    await api.json<
      RESPONSE_MODEL<{ id: number; title: string; isPublic: boolean }>
    >();
  const resumeId = created["data"]["id"];

  const detailApi = await BACKEND_API(`resumes/${resumeId}`);
  if (!detailApi.ok) throw await detailApi.json<API_FAIL_RESPONSE>();
  const detail = await detailApi.json<RESPONSE_MODEL<RESUME_DETAIL_MODEL>>();

  return {
    id: resumeId,
    title: detail["data"]["title"],
    type,
    isPublic: detail["data"]["isPublic"],
    slug: detail["data"]["slug"],
  };
}

/** 공개/비공개 토글 (BE: PATCH /api/resumes/{id}/visibility) */
export async function API_SERVER_RESUMES_VISIBILITY(
  resumeId: number,
  isPublic: boolean
) {
  const api = await BACKEND_API(`resumes/${resumeId}/visibility`, {
    method: "patch",
    json: { isPublic },
  });

  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();

  const response =
    await api.json<RESPONSE_MODEL<{ id: number; isPublic: boolean }>>();
  return response["data"];
}
