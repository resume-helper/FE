import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_RESUMES_DETAIL(resumeId: number) {
  return CLIENT_API("resumes/detail", {
    json: { resumeId },
  }).json<RESUME_DETAIL>();
}

export async function API_CLIENT_RESUMES_FEEDBACKS(
  resumeId: number,
  page: number,
  size: number
) {
  return CLIENT_API("resumes/feedbacks", {
    json: { resumeId, page, size },
  }).json<FEEDBACK_PAGE>();
}

export async function API_CLIENT_RESUMES_FEEDBACK_STATS(resumeId: number) {
  return CLIENT_API("resumes/feedback-stats", {
    json: { resumeId },
  }).json<FEEDBACK_STATS>();
}

export async function API_CLIENT_RESUMES_ANALYTICS(resumeId: number) {
  return CLIENT_API("resumes/analytics", {
    json: { resumeId },
  }).json<RESUME_ANALYTICS>();
}

export async function API_CLIENT_RESUMES_DELETE(resumeIds: number[]) {
  return CLIENT_API("resumes/delete", { json: { resumeIds } }).json<{
    success: boolean;
  }>();
}
