import { DeleteCookies } from "@/shared/lib/cookies";
import { signOut } from "next-auth/react";

export async function LogoutCallback() {
  await DeleteCookies();
  signOut();
}
