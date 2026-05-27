import { Button, FlexBox, Typography } from "@wanteddev/wds";

const sectionInner = {
  maxWidth: "1248px",
  width: "100%",
  margin: "0 auto",
  padding: "0 24px",
} as const;

export default function Home() {
  return (
    <FlexBox flexDirection="column" gap="60px" sx={{ paddingTop: "60px" }}>
      {/* Hero Section */}
      <FlexBox sx={sectionInner}>
        <FlexBox gap="24px" sx={{ width: "100%" }}>
          <FlexBox flexDirection="column" gap="24px" sx={{ flex: 1 }}>
            <FlexBox flexDirection="column" gap="8px">
              <Typography variant="display3" weight="bold">
                이력서 작성부터 피드백까지, 한 번에
              </Typography>
              <Typography variant="headline1" weight="regular">
                한 번 쌓은 경험 블록으로 PDF와 웹 이력서를 동시에 만들고, 실제
                피드백까지 받아보세요
              </Typography>
            </FlexBox>
            <Button>무료로 시작하기</Button>
          </FlexBox>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "320px",
              height: "360px",
              background: "#F7F7F8",
            }}
          >
            콘텐츠 영역
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {/* Service Section */}
      <FlexBox sx={sectionInner}>
        <FlexBox flexDirection="column" gap="32px" sx={{ width: "100%" }}>
          <FlexBox flexDirection="column" gap="8px">
            <Typography variant="title2" weight="bold">
              서비스
            </Typography>
            <Typography variant="headline1" weight="regular">
              다음과 같은 기능들을 사용해 볼 수 있어요 원하는 기능을 선택해
              보세요 아마도 두줄까지는 사용할 것 같아요.
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {/* Feature Cards Section */}
      <FlexBox sx={sectionInner}>
        <FlexBox gap="20px" sx={{ width: "100%" }}>
          {[1, 2, 3].map((i) => (
            <FlexBox
              key={i}
              gap="16px"
              flexDirection="column"
              alignItems="end"
              sx={{
                flex: 1,
                background: "#F7F7F8",
                padding: "16px",
              }}
            >
              <FlexBox flexDirection="column" gap="4px">
                <Typography variant="heading2" weight="bold">
                  컨텐츠 블록 (기능{i})
                </Typography>
                <Typography variant="body1" weight="regular">
                  컨텐츠 블록에 대한 설명이 대략 두문장 정도 들어가요.
                </Typography>
              </FlexBox>

              <FlexBox
                justifyContent="end"
                flexDirection="column"
                gap="10px"
                sx={{
                  padding: "23px 12px 23px 13px",
                  background: "#989BA2",
                  borderRadius: "12px",
                }}
              >
                아이콘?
              </FlexBox>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
