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

  const result = await BACKEND_API("resumes", {
    searchParams,
  })
    .json<API_SERVER_RESUMSES_LIST>()
    .catch<API_FAIL_RESPONSE>();

  return result;
}
