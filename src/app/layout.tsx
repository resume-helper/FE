import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "./providers/QueryProvider";
import { GlobalAlert } from "@/shared/ui/GlobalAlert";
import { Toast } from "@/shared/ui/Toast";
import { SessionProvider } from "./providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const pretendard = localFont({
  src: "./fonts/PretendardJPVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <SessionProvider session={session}>
          <QueryProvider>
            {children}
            <GlobalAlert />
            <Toast />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
