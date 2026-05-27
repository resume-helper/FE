import { ContentBadge, FlexBox, IconButton, Typography } from "@wanteddev/wds";
import { IconCircle, IconShareIos } from "@wanteddev/wds-icon";

interface ResumeCardProps {
  title: string;
  isPublic: boolean;
  views: number;
  stayTime: string;
  rating: number;
  date: string;
}

export function ResumeCard({
  title,
  isPublic,
  views,
  stayTime,
  rating,
  date,
}: ResumeCardProps) {
  return (
    <FlexBox
      alignItems="center"
      gap="10px"
      sx={{
        width: "100%",
        padding: "20px",
        background: "var(--semantic-background-elevated-normal)",
        overflow: "hidden",
      }}
    >
      <ContentBadge
        color="accent"
        size="medium"
        accentColor="semantic.accent.foreground.red"
      >
        {isPublic ? "공개" : "비공개"}
      </ContentBadge>

      <FlexBox
        flexDirection="column"
        alignItems="start"
        gap="4px"
        sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}
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
          {title}
        </Typography>

        <FlexBox gap="4px" alignItems="center">
          <Typography
            variant="label2"
            weight="regular"
            sx={{ color: "var(--semantic-label-alternative)" }}
          >
            조회수 {views}
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
            체류시간 {stayTime}
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
            별점 {rating.toFixed(1)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox alignItems="center">
        <FlexBox sx={{ padding: "10px 8px" }}>
          <Typography variant="label1" weight="regular">
            {date}
          </Typography>
        </FlexBox>
        <IconButton aria-label="공유">
          <IconShareIos width="20" height="20" />
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
}
