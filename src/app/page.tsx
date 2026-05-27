import Link from "next/link";
import { FlexBox, Typography } from "@wanteddev/wds";
import { IconExternalLink } from "@wanteddev/wds-icon";

const DOC_LINKS = [
  {
    title: "컴포넌트",
    description: "Button, Input, Modal 등 UI 컴포넌트 전체 목록 및 Props 설명",
    href: "https://montage.wanted.co.kr/docs/components",
  },
  {
    title: "아이콘",
    description: "IconPlus, IconClose 등 아이콘 이름 검색 및 미리보기",
    href: "https://montage.wanted.co.kr/docs/foundations/base-material/icons",
  },
  {
    title: "유틸리티",
    description: "getColorByToken, useTheme 등 색상/테마 유틸 함수 사용법",
    href: "https://montage.wanted.co.kr/docs/utilities",
  },
  {
    title: "GitHub",
    description: "montage-web 소스코드, 이슈 트래킹 및 컨트리뷰션 가이드",
    href: "https://github.com/wanteddev/montage-web",
  },
];

export default function Page() {
  return (
    <FlexBox
      flexDirection="column"
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "60px 24px",
        gap: "48px",
      }}
    >
      {/* 헤더 */}
      <FlexBox flexDirection="column" gap="12px">
        <Typography variant="display1" weight="bold">
          @wanteddev/wds 사용 가이드
        </Typography>

        <Typography
          variant="title3"
          weight="regular"
          sx={{ color: "var(--semantic-label-alternative)" }}
        >
          Wanted Design System 컴포넌트 임포트 방법 및 활용 예시
        </Typography>
      </FlexBox>

      {/* 공식 문서 링크 */}
      <FlexBox flexDirection="column" gap="12px">
        <Typography variant="title2" weight="bold">
          공식 문서
        </Typography>

        <FlexBox gap="12px" sx={{ flexWrap: "wrap" }}>
          {DOC_LINKS.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: "1 1 calc(25% - 9px)" }}
            >
              <FlexBox
                flexDirection="column"
                gap="6px"
                sx={{
                  height: "100%",
                  padding: "20px 24px",
                  borderRadius: "10px",
                  border: "1px solid var(--atomic-coolNeutral-90)",
                  background: "var(--semantic-background-elevated-normal)",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                  "&:hover": { borderColor: "var(--semantic-primary-normal)" },
                }}
              >
                <FlexBox alignItems="center" gap="6px">
                  <Typography variant="headline1" weight="bold">
                    {doc.title}
                  </Typography>
                  <IconExternalLink width={14} height={14} />
                </FlexBox>

                <Typography
                  variant="body2"
                  weight="regular"
                  sx={{ color: "var(--semantic-label-alternative)" }}
                >
                  {doc.description}
                </Typography>
              </FlexBox>
            </Link>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
