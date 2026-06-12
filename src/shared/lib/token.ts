"use server";

import { cookies } from "next/headers";
import { DataDecrypt, DataEncrypt } from "./crpyto";

export async function SetToken(headers: Headers) {
  const a = headers.get(process.env.ACCESS_TOKEN_KEY as string);
  const r = headers.get(process.env.REFRESH_TOKEN_KEY as string);

  const token = DataEncrypt({ a, r });

  const cookie = await cookies();

  cookie.set(process.env.COOKIE_STORE_NAME as string, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 6,
  });
}

export async function GetToken() {
  const cookie = await cookies();

  const token = cookie.get(process.env.COOKIE_STORE_NAME as string);

  if (!token) return null;

  return DataDecrypt(token["value"]) ?? null;
}

export async function DeleteToken() {
  const cookie = await cookies();

  cookie.delete(process.env.COOKIE_STORE_NAME as string);
}
