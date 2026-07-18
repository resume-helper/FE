import { BACKEND_API } from "@/shared/api/api.server.instance";

export async function API_SERVER_RESUMSES_LIST(
  page: number,
  size: number,
  type: "WEB" | "PDF",
  sort: "NEWEST" | "OLDEST",
  title?: string
) {
  const searchParams: {
    [key: string]: string | number;
  } = {
    page,
    size,
    type,
    sort,
  };

  if (title) searchParams["title"] = title;

  const api = await BACKEND_API("resumes", {
    searchParams,
  });

  if (api.status === 401) {
    throw await api.json().catch<API_FAIL_RESPONSE>();
  }

  const response = await api.json<API_SERVER_RESUMSES_LIST>();

  return response["data"];
}
