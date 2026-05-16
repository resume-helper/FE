import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "./providers/QueryProvider";
import { GlobalAlert } from "@/shared/ui/GlobalAlert";
import { Toast } from "@/shared/ui/Toast";

const pretendard = localFont({
  src: "./fonts/PretendardJPVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>
          {children}
          <GlobalAlert />
          <Toast />
        </QueryProvider>
      </body>
    </html>
  );
}
