"use client";

import {
  FlexBox,
  Typography,
  Button,
  ContentBadge,
  IconButton,
} from "@wanteddev/wds";
import { IconChevronRight, IconPersons, IconPlus } from "@wanteddev/wds-icon";
import { ResumeCard } from "./_components/ResumeCard";
import { CreateResumeModal } from "../_components/CreateResumeModal";

export default function Page() {
  return (
    <FlexBox flexDirection="column" gap="16px">
      <FlexBox flexDirection="column" gap="20px">
        <FlexBox alignItems="center" justifyContent="space-between">
          <Typography variant="title1" weight="medium">
            홈
          </Typography>

          <CreateResumeModal>
            <Button size="medium">이력서 제작하기</Button>
          </CreateResumeModal>
        </FlexBox>

        <FlexBox gap="16px">
          <FlexBox
            flexDirection="column"
            alignItems="start"
            gap="16px"
            sx={{
              flex: 1,
              padding: "20px",
              background: "var(--semantic-background-elevated-normal)",
            }}
          >
            <FlexBox
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
              }}
            >
              <ContentBadge color="neutral" size="small">
                <IconPersons />
              </ContentBadge>

              <ContentBadge color="neutral" size="small">
                <IconPlus />
                12.5%
              </ContentBadge>
            </FlexBox>

            <FlexBox flexDirection="column" gap="4px">
              <Typography
                variant="label1"
                weight="bold"
                sx={{
                  color: "#666",
                }}
              >
                이력서 전체 열람수
              </Typography>
              <Typography
                variant="title1"
                weight="regular"
                sx={{
                  color: "#333",
                }}
              >
                2,482
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox
            flexDirection="column"
            alignItems="start"
            gap="16px"
            sx={{
              flex: 1,
              padding: "20px",
              background: "var(--semantic-background-elevated-normal)",
            }}
          >
            <FlexBox
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
              }}
            >
              <ContentBadge color="neutral" size="small">
                <IconPersons />
              </ContentBadge>

              <ContentBadge color="neutral" size="small">
                <IconPlus />
                12.5%
              </ContentBadge>
            </FlexBox>

            <FlexBox flexDirection="column" gap="4px">
              <Typography
                variant="label1"
                weight="bold"
                sx={{
                  color: "#666",
                }}
              >
                이력서 평균 체류시간
              </Typography>
              <Typography
                variant="title1"
                weight="regular"
                sx={{
                  color: "#333",
                }}
              >
                4m 32s
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox
            flexDirection="column"
            alignItems="start"
            gap="16px"
            sx={{
              flex: 1,
              padding: "20px",
              background: "var(--semantic-background-elevated-normal)",
            }}
          >
            <FlexBox
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
              }}
            >
              <ContentBadge color="neutral" size="small">
                <IconPersons />
              </ContentBadge>

              <ContentBadge color="neutral" size="small">
                <IconPlus />
                12.5%
              </ContentBadge>
            </FlexBox>

            <FlexBox flexDirection="column" gap="4px">
              <Typography
                variant="label1"
                weight="bold"
                sx={{
                  color: "#666",
                }}
              >
                평균 별점
              </Typography>
              <Typography
                variant="title1"
                weight="regular"
                sx={{
                  color: "#333",
                }}
              >
                4.8
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox gap="16px">
        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            flex: 1,
            minWidth: 0,
            background: "var(--semantic-background-elevated-normal)",
            padding: "20px",
          }}
        >
          <FlexBox alignItems="center" justifyContent="space-between">
            <Typography variant="headline1" weight="medium">
              이력서 현황
            </Typography>

            <IconButton>
              <IconChevronRight />
            </IconButton>
          </FlexBox>
          <FlexBox sx={{ border: "1px solid var(--atomic-coolNeutral-95)" }}>
            <ResumeCard
              title="긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목"
              isPublic={false}
              views={123}
              stayTime="00초"
              rating={0.0}
              date="2020.03.03"
            />
          </FlexBox>
        </FlexBox>

        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            flex: 1,
            minWidth: 0,
            background: "var(--semantic-background-elevated-normal)",
            padding: "20px",
          }}
        >
          <FlexBox alignItems="center" justifyContent="space-between">
            <Typography variant="headline1" weight="medium">
              블록 라이브러리
            </Typography>

            <IconButton>
              <IconChevronRight />
            </IconButton>
          </FlexBox>
          <FlexBox sx={{ border: "1px solid var(--atomic-coolNeutral-95)" }}>
            <ResumeCard
              title="긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목"
              isPublic={false}
              views={123}
              stayTime="00초"
              rating={0.0}
              date="2020.03.03"
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
