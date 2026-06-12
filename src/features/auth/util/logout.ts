import { DeleteToken } from "@/shared/lib/token";
import { signOut } from "next-auth/react";

export async function LogoutCallback() {
  await DeleteToken();
  signOut();
}
