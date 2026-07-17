import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_RESUMES_SAVE(
  params: API_CLIENT_RESUMES_SAVE_PARAMS
) {
  return CLIENT_API("resumes/save", {
    json: params,
  }).json<RESUME_SAVE_RESULT>();
}

export async function API_CLIENT_RESUMES_VISIBILITY(
  params: API_CLIENT_RESUMES_VISIBILITY_PARAMS
) {
  return CLIENT_API("resumes/visibility", { json: params }).json<{
    id: number;
    isPublic: boolean;
  }>();
}
