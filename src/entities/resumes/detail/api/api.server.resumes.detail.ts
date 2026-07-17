import type { KyResponse } from "ky";

import { BACKEND_API } from "@/shared/api/api.server.instance";

async function unwrap<T>(api: KyResponse): Promise<T> {
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  const response = await api.json<RESPONSE_MODEL<T>>();
  return response["data"];
}

/** 이력서 상세 (BE: GET /api/resumes/{id}) */
export async function API_SERVER_RESUMES_DETAIL(resumeId: number) {
  return unwrap<RESUME_DETAIL>(await BACKEND_API(`resumes/${resumeId}`));
}

/** 피드백 목록 (BE: GET /api/resumes/{id}/feedbacks) */
export async function API_SERVER_RESUMES_FEEDBACKS(
  resumeId: number,
  page: number,
  size: number
) {
  return unwrap<FEEDBACK_PAGE>(
    await BACKEND_API(`resumes/${resumeId}/feedbacks`, {
      searchParams: { page, size },
    })
  );
}

/** 피드백 통계 (BE: GET /api/resumes/{id}/feedbacks/stats) */
export async function API_SERVER_RESUMES_FEEDBACK_STATS(resumeId: number) {
  return unwrap<FEEDBACK_STATS>(
    await BACKEND_API(`resumes/${resumeId}/feedbacks/stats`)
  );
}

/** 열람 분석 (BE: GET /api/resumes/{id}/analytics) */
export async function API_SERVER_RESUMES_ANALYTICS(resumeId: number) {
  return unwrap<RESUME_ANALYTICS>(
    await BACKEND_API(`resumes/${resumeId}/analytics`)
  );
}

/** 이력서 삭제 (BE: DELETE /api/resumes — 배치) */
export async function API_SERVER_RESUMES_DELETE(resumeIds: number[]) {
  const api = await BACKEND_API("resumes", {
    method: "delete",
    json: { ids: resumeIds },
  });
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  return { success: true };
}
