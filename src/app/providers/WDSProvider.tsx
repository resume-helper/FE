"use client";

import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import { ThemeProvider } from "@wanteddev/wds";

export default function WDSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
