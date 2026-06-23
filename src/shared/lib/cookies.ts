"use server";

import { cookies } from "next/headers";

import { DataEncrypt, DataDecrypt } from "./crpyto";

export async function SetCookies(headers: Headers) {
  const a = headers.get(process.env.ACCESS_TOKEN_KEY as string);
  const r = headers.get(process.env.REFRESH_TOKEN_KEY as string);

  const token = DataEncrypt({ a, r });

  const cookie = await cookies();

  cookie.set(process.env.COOKIE_STORE_NAME as string, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function SetCookiesAccessToken(headers: Headers) {
  const newAccessToken = headers.get(process.env.ACCESS_TOKEN_KEY as string);

  const cookie = await cookies();

  const token = cookie.get(process.env.COOKIE_STORE_NAME as string);

  if (!token || !token["value"]) return null;

  const tokenObj = DataDecrypt(token["value"]);

  tokenObj["a"] = newAccessToken;

  cookie.set(process.env.COOKIE_STORE_NAME as string, DataEncrypt(tokenObj), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function GetCookies() {
  const cookie = await cookies();

  const token = cookie.get(process.env.COOKIE_STORE_NAME as string);

  if (!token || !token["value"]) return null;

  return DataDecrypt(token["value"]) ?? null;
}

export async function DeleteCookies() {
  const cookie = await cookies();

  cookie.delete(process.env.COOKIE_STORE_NAME as string);
}
