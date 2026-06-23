import { NextRequest, NextResponse } from "next/server";

import { API_SERVER_BLOCKS_LIST } from "@/entities/blocks/list/api/api.server.blocks.list";

export async function POST(req: NextRequest) {
  try {
    const type = (await req.json()) as BLOCK_TYPE;

    const result = await API_SERVER_BLOCKS_LIST(type);

    if (result) {
      return NextResponse.json(result, { status: 200 });
    } else {
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
}
