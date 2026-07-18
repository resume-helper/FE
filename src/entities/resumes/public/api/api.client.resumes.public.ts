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
  return CLIENT_API("public/feedback", { json: params }).json<FEEDBACK_ITEM>();
}
