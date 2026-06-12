import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";

export default async function LoginUserPageServer() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/r/1");
  }

  redirect("/");
}
