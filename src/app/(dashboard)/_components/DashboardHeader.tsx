"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";
import {
  Avatar,
  FlexBox,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
  Typography,
  getColorByToken,
  useTheme,
} from "@wanteddev/wds";
import { IconChevronDown } from "@wanteddev/wds-icon";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";

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
  justify-content: space-between;
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
  padding: 0 24px;
  background: var(--semantic-background-normal-alternative);
`;

export function DashboardHeader() {
  const pathname = usePathname();
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();
  const title = TITLE_MAP[pathname] ?? "";

  return (
    <StyledHeader
      $borderColor={getColorByToken(theme, "semantic.line.solid.alternative")}
    >
      <Typography variant="title3" weight="bold">
        {title}
      </Typography>

      <Menu>
        <MenuTrigger>
          <FlexBox
            alignItems="center"
            gap="8px"
            sx={{
              cursor: "pointer",
              color: getColorByToken(theme, "semantic.label.normal"),
            }}
          >
            <Avatar
              variant="person"
              size="small"
              src={user?.profileImageUrl}
              alt={user?.profileImageUrl ? user?.name : undefined}
            />
            <Typography variant="body2" weight="bold">
              {user?.name}
            </Typography>
            <IconChevronDown width={16} height={16} />
          </FlexBox>
        </MenuTrigger>
        <MenuContent>
          <MenuList>
            <MenuItem value="logout" onClick={() => logout()}>
              로그아웃
            </MenuItem>
          </MenuList>
        </MenuContent>
      </Menu>
    </StyledHeader>
  );
}
