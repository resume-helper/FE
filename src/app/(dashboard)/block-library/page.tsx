import Link from "next/link";
import {
  Button,
  FlexBox,
  Typography,
  Chip,
  Grid,
  GridItem,
  ContentBadge,
  TextButton,
  Pagination,
} from "@wanteddev/wds";
import { IconPlus, IconTrash, IconWrite } from "@wanteddev/wds-icon";

export default function Page() {
  return (
    <FlexBox flexDirection="column" gap="22px">
      <FlexBox alignItems="center" justifyContent="space-between">
        <FlexBox flexDirection="column" gap="4px">
          <Typography variant="title1" weight="medium">
            경험을 블록으로 쌓아두세요
          </Typography>

          <Typography
            variant="headline2"
            weight="medium"
            sx={{ color: "var(--atomic-coolNeutral-60)" }}
          >
            한번 입력한 콘텐츠는 PDF・웹 이력서 버전 어디서든 활용해 제작할 수
            있어요
          </Typography>
        </FlexBox>

        <Link href="/block-library/create">
          <Button size="medium" leadingContent={<IconPlus />}>
            새 블록 생성
          </Button>
        </Link>
      </FlexBox>

      <FlexBox alignItems="center" gap="10px">
        <Chip variant="solid" active>
          전체(20)
        </Chip>
        <Chip variant="outlined">경력(2)</Chip>
        <Chip variant="outlined">프로젝트(2)</Chip>
        <Chip variant="outlined">기술스택(2)</Chip>
        <Chip variant="outlined">자기소개(2)</Chip>
        <Chip variant="outlined">학력(2)</Chip>
        <Chip variant="outlined">수상・자격(2)</Chip>
        <Chip variant="outlined">활동・교육(2)</Chip>
      </FlexBox>

      <FlexBox
        justifyContent="center"
        alignItems="center"
        gap="16px"
        flexDirection="column"
      >
        <Grid spacing={20}>
          {[1, 2, 3, 4].map((i) => (
            <GridItem key={i} columns={6}>
              <FlexBox
                flexDirection="column"
                justifyContent="space-between"
                sx={{
                  padding: "16px 20px",
                  minHeight: "184px",
                  background: "var(--semantic-background-elevated-normal)",
                }}
              >
                <FlexBox flexDirection="column" gap="8px">
                  <FlexBox gap="16px" alignItems="start">
                    <ContentBadge color="neutral" size="small">
                      경력
                    </ContentBadge>
                    <Typography
                      variant="headline2"
                      weight="bold"
                      sx={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--semantic-label-normal)",
                      }}
                    >
                      프론트엔드 구인
                    </Typography>
                  </FlexBox>
                  <Typography
                    variant="label1"
                    weight="regular"
                    sx={{ color: "var(--atomic-coolNeutral-60)" }}
                  >
                    2021.01 - 2022.02
                  </Typography>
                  <Typography
                    variant="body2-reading"
                    weight="medium"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: "var(--atomic-coolNeutral-40)",
                    }}
                  >
                    검색 광고 플랫폼 API 고도화. 기존 레거시 시스템을 Spring
                    Boot로 마이그레이션하며 응답 속도 30% 향상 및 유지보수 비용
                    절감. 검색 광고 플랫폼 API 고도화. 기존 레거시 시스템을
                    Spring Boot로 마이그레이션하며 응답 속도 30% 향상 및
                    유지보수 비용 절감.
                  </Typography>
                </FlexBox>

                <FlexBox alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="label1"
                    weight="regular"
                    sx={{ color: "var(--atomic-coolNeutral-60)" }}
                  >
                    최종 수정 2026. 04. 20
                  </Typography>

                  <FlexBox alignItems="center" gap="8px">
                    <TextButton
                      color="assistive"
                      leadingContent={<IconWrite />}
                    >
                      <Typography variant="label1" weight="bold">
                        수정
                      </Typography>
                    </TextButton>
                    <TextButton
                      color="assistive"
                      leadingContent={<IconTrash />}
                    >
                      <Typography variant="label1" weight="bold">
                        삭제
                      </Typography>
                    </TextButton>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </GridItem>
          ))}
        </Grid>

        <Pagination variant="compact" totalPages={10} />
      </FlexBox>
    </FlexBox>
  );
}
