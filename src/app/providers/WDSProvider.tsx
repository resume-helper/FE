"use client";

import type { ReactNode, ReactElement } from "react";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import { ThemeProvider } from "@wanteddev/wds";
import { ThemeProvider as StyledComponentsProvider } from "styled-components";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

function SCProvider({
  theme,
  children,
}: {
  theme: object;
  children: ReactNode;
}): ReactElement {
  return (
    <StyledComponentsProvider theme={theme}>
      {children}
    </StyledComponentsProvider>
  );
}

export default function WDSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <AppRouterCacheProvider options={{ prepend: true }}>
        <ThemeProvider provider={SCProvider}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </StyledComponentsRegistry>
  );
}
