import { BACKEND_API } from "@/shared/api/api.server.instance";

/** 공개 이력서 열람 (BE: GET /api/public/resumes/{slug} — 비인증) */
export async function API_SERVER_PUBLIC_RESUME(slug: string) {
  const api = await BACKEND_API(`public/resumes/${slug}`);
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  const response = await api.json<RESPONSE_MODEL<PUBLIC_RESUME>>();
  return response["data"];
}

/** 열람 세션 시작 (BE: POST /api/public/resumes/{slug}/view-sessions — 비인증) */
export async function API_SERVER_PUBLIC_VIEW_SESSION(
  slug: string,
  visitorIp: string
) {
  const api = await BACKEND_API(`public/resumes/${slug}/view-sessions`, {
    method: "post",
    headers: { "X-Forwarded-For": visitorIp },
  });
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  const response = await api.json<RESPONSE_MODEL<{ sessionId: number }>>();
  return response["data"];
}

/** 체류시간 보고 (BE: PUT /api/public/resumes/{slug}/view-sessions/{sessionId}) */
export async function API_SERVER_PUBLIC_VIEW_DURATION(
  params: API_CLIENT_VIEW_DURATION_PARAMS
) {
  const api = await BACKEND_API(
    `public/resumes/${params.slug}/view-sessions/${params.sessionId}`,
    {
      method: "put",
      json: {
        totalDurationSec: params.totalDurationSec,
        sectionDwells: params.sectionDwells,
      },
    }
  );
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  return { success: true };
}

/** 익명 피드백 제출 (BE: POST /api/resumes/{id}/feedbacks — permitAll) */
export async function API_SERVER_PUBLIC_FEEDBACK(
  params: API_CLIENT_PUBLIC_FEEDBACK_PARAMS,
  visitorIp: string
) {
  const api = await BACKEND_API(`resumes/${params.resumeId}/feedbacks`, {
    method: "post",
    headers: { "X-Forwarded-For": visitorIp },
    json: {
      section: params.section,
      rating: params.rating,
      comment: params.comment,
      tags: params.tags,
    },
  });
  if (!api.ok) throw await api.json<API_FAIL_RESPONSE>();
  const response = await api.json<RESPONSE_MODEL<FEEDBACK_ITEM>>();
  return response["data"];
}
