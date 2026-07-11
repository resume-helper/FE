import { redirect } from "next/navigation";
import { GetCookies } from "@/shared/lib/cookies";

import HomePageView from "./_view";

const HomePageServer = async () => {
  const cookie = await GetCookies();

  if (cookie) return redirect("/r");

  return <HomePageView />;
};

export default HomePageServer;
