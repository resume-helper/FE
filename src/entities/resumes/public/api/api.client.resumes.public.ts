import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_PUBLIC_RESUME(slug: string) {
  return CLIENT_API("public/resume", { json: { slug } }).json<PUBLIC_RESUME>();
}

export async function API_CLIENT_PUBLIC_VIEW_SESSION(slug: string) {
  return CLIENT_API("public/view-session", { json: { slug } }).json<{
    sessionId: number;
  }>();
}

export async function API_CLIENT_PUBLIC_FEEDBACK(
  params: API_CLIENT_PUBLIC_FEEDBACK_PARAMS
) {
  // ky HTTPError 는 응답 본문을 노출하지 않는다. throwHttpErrors:false 로 응답을
  // 직접 받아 BE 실패 사유(code·message)를 error 에 실어 던진다.
  const res = await CLIENT_API("public/feedback", {
    json: params,
    throwHttpErrors: false,
  });
  if (!res.ok) {
    const fail = (await res.json().catch(() => null)) as {
      code?: string;
      message?: string;
    } | null;
    const error = new Error(
      fail?.message ?? "피드백 제출에 실패했습니다"
    ) as Error & {
      code?: string;
    };
    error.code = fail?.code;
    throw error;
  }
  return (await res.json()) as FEEDBACK_ITEM;
}
