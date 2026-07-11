import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_RESUMSES_DELETE(ids: number[]) {
  const api = await BACKEND_API("resumes", {
    method: "delete",
    json: { ids },
  });

  const response = await api
    .json<API_SERVER_RESUMSES_DELETE>()
    .catch<API_FAIL_RESPONSE>();

  return response;
}
