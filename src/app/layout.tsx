import "./globals.css";
import "@wanteddev/wds/global.css";
import "@wanteddev/wds/theme.css";
import localFont from "next/font/local";
import QueryProvider from "./providers/QueryProvider";
import WDSProvider from "./providers/WDSProvider";

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
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body>
        <WDSProvider>
          <QueryProvider>{children}</QueryProvider>
        </WDSProvider>
      </body>
    </html>
  );
}
