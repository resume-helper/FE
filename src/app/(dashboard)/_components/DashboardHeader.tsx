"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Typography, getColorByToken, useTheme } from "@wanteddev/wds";

const TITLE_MAP: Record<string, string> = {
  "/home": "홈",
  "/block-library": "블록 라이브러리",
  "/web-resume": "웹 이력서",
  "/web-resume/create": "웹 이력서 제작",
  "/pdf-resume": "PDF 이력서",
  "/pdf-resume/create": "PDF 이력서 제작",
  "/settings": "설정",
};

const StyledHeader = styled.header<{ $borderColor: string }>`
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
  padding: 0 24px;
`;

export function DashboardHeader() {
  const pathname = usePathname();
  const theme = useTheme();
  const title = TITLE_MAP[pathname] ?? "";

  return (
    <StyledHeader
      $borderColor={getColorByToken(theme, "semantic.line.solid.alternative")}
    >
      <Typography variant="title3" weight="bold">
        {title}
      </Typography>
    </StyledHeader>
  );
}
