import {
  FlexBox,
  Typography,
  Button,
  SearchField,
  Select,
  OptionGroup,
  Option,
  ContentBadge,
  IconButton,
} from "@wanteddev/wds";
import { IconCircle, IconShareIos } from "@wanteddev/wds-icon";

export default function Page() {
  return (
    <FlexBox flexDirection="column" gap="16px">
      <FlexBox flexDirection="column" gap="20px">
        <FlexBox alignItems="center" justifyContent="space-between">
          <Typography variant="title1" weight="medium">
            Web Resume List
          </Typography>

          <Button size="medium">이력서 생성하기</Button>
        </FlexBox>

        <FlexBox alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center" gap="8px">
            <SearchField width="25ch" placeholder="이력서 제목 검색" />

            <Select width="25ch" placeholder="선택해주세요.">
              {new Array(3).fill(0).map((_, i) => (
                <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                  {new Array(3).fill(0).map((__, j) => (
                    <Option key={j} value={`값 ${i} ${j}`}>
                      {`값 ${i} ${j}`}
                    </Option>
                  ))}
                </OptionGroup>
              ))}
            </Select>
          </FlexBox>
          <Button variant="outlined" size="medium">
            선택
          </Button>
        </FlexBox>
      </FlexBox>

      <FlexBox flexDirection="column">
        <FlexBox
          alignItems="center"
          gap="10px"
          sx={{
            padding: "20px",
            background: "white",
          }}
        >
          <ContentBadge
            color="accent"
            size="medium"
            accentColor="semantic.accent.foreground.red"
          >
            비공개
          </ContentBadge>

          <FlexBox
            flexDirection="column"
            alignItems="start"
            gap="4px"
            sx={{ flex: 1, overflow: "hidden" }}
          >
            <Typography
              variant="headline2"
              weight="medium"
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴
              이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서 제목 긴 이력서
              제목
            </Typography>

            <FlexBox gap="4px" alignItems="center">
              <Typography
                variant="label2"
                weight="regular"
                sx={{ color: "var(--semantic-label-alternative)" }}
              >
                조회수 123
              </Typography>

              <IconCircle
                width={2}
                height={2}
                sx={{ color: "var(--semantic-label-alternative)" }}
              />

              <Typography
                variant="label2"
                weight="regular"
                sx={{ color: "var(--semantic-label-alternative)" }}
              >
                체류시간 00초
              </Typography>

              <Typography
                variant="label2"
                weight="regular"
                sx={{ color: "var(--semantic-label-alternative)" }}
              >
                별점 0.0
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox alignItems="center">
            <FlexBox sx={{ padding: "10px 8px" }}>
              <Typography variant="label1" weight="regular">
                2020.03.03
              </Typography>
            </FlexBox>
            <IconButton aria-label="공유">
              <IconShareIos width="20" height="20" />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
