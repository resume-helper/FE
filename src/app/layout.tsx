import "@/styles/globals.css";
import localFont from "next/font/local";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import { GlobalAlert } from "@/shared/ui/GlobalAlert";
import { Toast } from "@/shared/ui/Toast";

import { SessionProvider } from "@/provider/SessionProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardJPVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

const RootLayout = async ({ children }: LAYOUT_CHILD) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <SessionProvider session={session}>
          {children}
          <GlobalAlert />
          <Toast />
        </SessionProvider>

        <div id="portal-root"></div>
      </body>
    </html>
  );
};

export default RootLayout;
