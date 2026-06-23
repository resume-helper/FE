import { redirect } from "next/navigation";

import { GetCookies } from "@/shared/lib/cookies";

import { QueryProvider } from "@/provider/QueryProvider";

import { AfterLoginWrapper } from "@/widgets/AfterLoginWrapper";

interface AFTER_LOGIN_PAGE_ROOT extends LAYOUT_CHILD {
  parallel: React.ReactNode;
}

const AfterLoginPageRoot = async ({
  children,
  parallel,
}: AFTER_LOGIN_PAGE_ROOT) => {
  const cookie = await GetCookies();

  if (!cookie) return redirect("/");

  return (
    <QueryProvider>
      <AfterLoginWrapper>
        {children}
        {parallel}
      </AfterLoginWrapper>
    </QueryProvider>
  );
};

export default AfterLoginPageRoot;
