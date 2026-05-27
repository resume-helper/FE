"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlexBox,
  Accordion,
  AccordionSummary,
  AccordionSummaryContent,
  AccordionDetails,
  AccordionDescription,
  TextButton,
  Typography,
  getColorByToken,
  useTheme,
} from "@wanteddev/wds";
import {
  IconHome,
  IconDocumentText,
  IconSetting,
  IconChevronDown,
  IconChevronRight,
  IconStorage,
  IconRightSide,
} from "@wanteddev/wds-icon";

const MENU_HEIGHT = 40;
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const RESUME_ITEMS = [
  { label: "웹 이력서", href: "/web-resume" },
  { label: "웹 이력서 제작", href: "/web-resume/create" },
  { label: "PDF 이력서", href: "/pdf-resume" },
  { label: "PDF 이력서 제작", href: "/pdf-resume/create" },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  isCollapsed: boolean;
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  isCollapsed,
}: NavItemProps) {
  const theme = useTheme();

  return (
    <Link href={href}>
      <FlexBox
        alignItems="center"
        justifyContent={isCollapsed ? "center" : undefined}
        gap={isCollapsed ? undefined : "12px"}
        sx={{
          height: MENU_HEIGHT,
          padding: isCollapsed ? "0" : "0 12px 0 20px",
          borderRadius: "8px",
          cursor: "pointer",
          background: active
            ? getColorByToken(theme, "semantic.fill.normal")
            : "transparent",
          color: active
            ? getColorByToken(theme, "semantic.label.normal")
            : getColorByToken(theme, "semantic.label.alternative"),
          "&:hover": {
            background: getColorByToken(theme, "semantic.fill.normal"),
          },
        }}
      >
        <Icon width={20} height={20} />
        {!isCollapsed && (
          <Typography variant="body2" weight="bold">
            {label}
          </Typography>
        )}
      </FlexBox>
    </Link>
  );
}

interface SubNavItemProps {
  href: string;
  label: string;
  active: boolean;
}

function SubNavItem({ href, label, active }: SubNavItemProps) {
  const theme = useTheme();

  return (
    <Link href={href}>
      <FlexBox
        alignItems="center"
        sx={{
          height: MENU_HEIGHT,
          padding: "0 12px 0 20px",
          borderRadius: "8px",
          cursor: "pointer",
          background: active
            ? getColorByToken(theme, "semantic.fill.normal")
            : "transparent",
          color: active
            ? getColorByToken(theme, "semantic.label.normal")
            : getColorByToken(theme, "semantic.label.alternative"),
          "&:hover": {
            background: getColorByToken(theme, "semantic.fill.normal"),
          },
        }}
      >
        <Typography variant="body2" weight="bold">
          {label}
        </Typography>
      </FlexBox>
    </Link>
  );
}

function AccordionNavItem({
  icon: Icon,
  label,
  items,
  isActive,
  pathname,
  isCollapsed,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  items: { label: string; href: string }[];
  isActive: boolean;
  pathname: string;
  isCollapsed: boolean;
}) {
  const theme = useTheme();

  if (isCollapsed) {
    return (
      <Link href={items[0].href}>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          sx={{
            height: MENU_HEIGHT,
            borderRadius: "8px",
            cursor: "pointer",
            background: isActive
              ? getColorByToken(theme, "semantic.fill.normal")
              : "transparent",
            color: isActive
              ? getColorByToken(theme, "semantic.label.normal")
              : getColorByToken(theme, "semantic.label.alternative"),
            "&:hover": {
              background: getColorByToken(theme, "semantic.fill.normal"),
            },
          }}
        >
          <Icon width={20} height={20} />
        </FlexBox>
      </Link>
    );
  }

  return (
    <Accordion
      defaultExpanded={isActive}
      sx={{
        borderBottom: "none !important",
        "& *": { borderBottom: "none !important" },
      }}
    >
      <AccordionSummary
        verticalPadding="none"
        fillWidth
        leadingContent={
          <AccordionSummaryContent variant="icon">
            <Icon width={20} height={20} />
          </AccordionSummaryContent>
        }
        trailingContent={
          <AccordionSummaryContent rotate>
            <IconChevronDown width={16} height={16} />
          </AccordionSummaryContent>
        }
        sx={{ height: MENU_HEIGHT, borderRadius: "8px", alignItems: "center" }}
      >
        {label}
      </AccordionSummary>
      <AccordionDetails
        sx={{ borderBottom: "none" }}
        wrapperSx={{ paddingTop: 0 }}
      >
        <FlexBox flexDirection="column" gap="4px">
          {items.map((item) => (
            <SubNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </FlexBox>
      </AccordionDetails>
    </Accordion>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isResumeActive = RESUME_ITEMS.some((item) =>
    pathname.startsWith(item.href)
  );

  return (
    <FlexBox
      flexDirection="column"
      gap="4px"
      sx={{
        width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        height: "100vh",
        flexShrink: 0,
        borderRight: `1px solid ${getColorByToken(theme, "semantic.line.solid.alternative")}`,
        padding: "0px 0px 20px",
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* 로고 + 토글 버튼 */}
      <FlexBox
        alignItems="center"
        justifyContent={isCollapsed ? "center" : "space-between"}
        sx={{ padding: "0 20px", height: "56px" }}
      >
        {!isCollapsed && (
          <Link href="/">
            <Typography variant="heading2" weight="bold">
              Resumemate
            </Typography>
          </Link>
        )}
        <FlexBox
          alignItems="center"
          justifyContent="center"
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "6px",
            cursor: "pointer",
            flexShrink: 0,
            color: getColorByToken(theme, "semantic.label.alternative"),
            "&:hover": {
              background: getColorByToken(theme, "semantic.fill.normal"),
            },
          }}
        >
          <IconRightSide width={20} height={20} />
        </FlexBox>
      </FlexBox>

      <NavItem
        href="/home"
        label="홈"
        icon={IconHome}
        active={pathname === "/home"}
        isCollapsed={isCollapsed}
      />

      <NavItem
        href="/block-library"
        label="블록 라이브러리"
        icon={IconStorage}
        active={pathname === "/block-library"}
        isCollapsed={isCollapsed}
      />

      <AccordionNavItem
        icon={IconDocumentText}
        label="이력서"
        items={RESUME_ITEMS}
        isActive={isResumeActive}
        pathname={pathname}
        isCollapsed={isCollapsed}
      />

      {!isCollapsed && (
        <AccordionDescription sx={{ padding: "8px 12px 4px", fontWeight: 700 }}>
          시스템
        </AccordionDescription>
      )}

      <NavItem
        href="/settings"
        label="설정"
        icon={IconSetting}
        active={pathname === "/settings"}
        isCollapsed={isCollapsed}
      />

      {!isCollapsed && (
        <FlexBox
          alignItems="center"
          gap="8px"
          sx={{
            marginTop: "auto",
            padding: "12px 20px",
            borderTop: `1px solid ${getColorByToken(theme, "semantic.line.solid.alternative")}`,
          }}
        >
          <TextButton
            size="small"
            color="assistive"
            trailingContent={<IconChevronRight width={14} height={14} />}
            sx={{ flex: 1 }}
          >
            서비스 소개
          </TextButton>
          <TextButton
            size="small"
            color="assistive"
            trailingContent={<IconChevronRight width={14} height={14} />}
            sx={{ flex: 1 }}
          >
            문의하기
          </TextButton>
        </FlexBox>
      )}
    </FlexBox>
  );
}
