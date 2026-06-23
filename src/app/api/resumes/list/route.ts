import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_RESUMSES_WEB_LIST } from "@/entities/resumes/list/api/api.resumes.web.list";
import { API_SERVER_REFRESH } from "@/entities/auth/refresh/api/api.server.refresh";

export async function POST(req: NextRequest) {
  const { offset, limit, sort, type } =
    (await req.json()) as API_CLIENT_RESUMSES_WEB_LIST_PARAMS;

  try {
    const result = await API_SERVER_RESUMSES_WEB_LIST(
      offset,
      limit,
      type,
      sort
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const isRefresh = await API_SERVER_REFRESH();

    if (isRefresh.success) {
      const result = await API_SERVER_RESUMSES_WEB_LIST(
        offset,
        limit,
        type,
        sort
      );

      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        {
          success: false,
          data: isRefresh.code as string,
          message: isRefresh.message,
        },
        { status: 500 }
      );
    }
  }
}
