"use client";

import {
  Button,
  Avatar,
  Chip,
  Divider,
  Typography,
  IconButton,
  Checkbox,
  TextField,
  Switch,
  Loading,
  ContentBadge,
} from "@wanteddev/wds";
import {
  IconHome,
  IconBell,
  IconSearch,
  IconHeart,
  IconStarFill,
  IconPlus,
  IconCheck,
} from "@wanteddev/wds-icon";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="title2" weight="bold">
        {title}
      </Typography>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <Divider />
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-10">
      <Typography variant="title1" weight="bold">
        @wanteddev/wds 컴포넌트 예시
      </Typography>

      {/* Button */}
      <Section title="Button">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" color="assistive">
          Assistive
        </Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button leadingContent={<IconPlus />}>아이콘 버튼</Button>
      </Section>

      {/* IconButton */}
      <Section title="IconButton">
        <IconButton aria-label="홈">
          <IconHome />
        </IconButton>
        <IconButton aria-label="알림">
          <IconBell />
        </IconButton>
        <IconButton aria-label="검색">
          <IconSearch />
        </IconButton>
        <IconButton aria-label="좋아요">
          <IconHeart />
        </IconButton>
        <IconButton aria-label="추가">
          <IconPlus />
        </IconButton>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="flex w-full flex-col gap-2">
          <Typography variant="title1" weight="bold">
            Title 1 Bold
          </Typography>
          <Typography variant="title2" weight="medium">
            Title 2 Medium
          </Typography>
          <Typography variant="headline1">Headline 1</Typography>
          <Typography variant="body1">Body 1 — 기본 본문 텍스트</Typography>
          <Typography variant="body2">Body 2 — 보조 텍스트</Typography>
          <Typography variant="caption1">Caption — 캡션 텍스트</Typography>
        </div>
      </Section>

      {/* Avatar */}
      <Section title="Avatar">
        <Avatar size="xsmall" variant="person" />
        <Avatar size="small" variant="person" />
        <Avatar size="medium" variant="person" />
        <Avatar size="large" variant="person" />
        <Avatar size="xlarge" variant="person" />
        <Avatar size="medium" variant="company" />
        <Avatar size="medium" variant="academy" />
      </Section>

      {/* Chip */}
      <Section title="Chip">
        <Chip>기본 칩</Chip>
        <Chip active>선택된 칩</Chip>
        <Chip variant="outlined">Outlined</Chip>
        <Chip leadingContent={<IconStarFill />}>아이콘 칩</Chip>
        <Chip disabled>비활성</Chip>
      </Section>

      {/* ContentBadge */}
      <Section title="ContentBadge">
        <ContentBadge>경력</ContentBadge>
        <ContentBadge>신입</ContentBadge>
        <ContentBadge>계약직</ContentBadge>
      </Section>

      {/* TextField */}
      <Section title="TextField">
        <div className="flex w-full flex-col gap-3">
          <TextField placeholder="기본 입력" />
          <TextField placeholder="유효성 오류" invalid />
          <TextField placeholder="비활성 상태" disabled />
        </div>
      </Section>

      {/* Checkbox & Switch */}
      <Section title="Checkbox / Switch">
        <Checkbox />
        <Checkbox defaultChecked />
        <Checkbox disabled />
        <Switch />
        <Switch defaultChecked />
        <Switch disabled />
      </Section>

      {/* Loading */}
      <Section title="Loading">
        <Loading size="small" />
        <Loading size="medium" />
        <Loading size="large" />
      </Section>

      {/* Icon */}
      <Section title="Icon (@wanteddev/wds-icon)">
        <IconHome width={24} height={24} />
        <IconBell width={24} height={24} />
        <IconSearch width={24} height={24} />
        <IconHeart width={24} height={24} />
        <IconStarFill width={24} height={24} />
        <IconPlus width={24} height={24} />
        <IconCheck width={24} height={24} />
      </Section>
    </div>
  );
}
