import { CLIENT_API } from "@/shared/api/api.client.instance";

export async function API_CLIENT_RESUMSES_DELETE(params: number[]) {
  try {
    const isDelete = await CLIENT_API("resumes/delete", {
      json: params,
    })
      .json<API_CLIENT_RESUMSES_DELETE>()
      .catch<API_CLIENT_RESUMSES_DELETE>();

    return isDelete;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
