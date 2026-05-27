"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FlexBox, Button, Typography, IconButton } from "@wanteddev/wds";
import { IconHandleDesktop, IconMinus, IconPlus } from "@wanteddev/wds-icon";
import { SortableBlockItem } from "./_components/SortableBlockItem";

interface Block {
  id: string;
  label: string;
}

const BASIC_BLOCKS: Block[] = [{ id: "basic-info", label: "기본정보" }];

const INITIAL_OTHER_BLOCKS: Block[] = [
  { id: "summary", label: "기본소개" },
  { id: "career", label: "경력" },
  { id: "project", label: "프로젝트" },
  { id: "education", label: "학력" },
  { id: "skill", label: "기술스택" },
  { id: "introduction", label: "자기소개" },
  { id: "certificate", label: "수상・자격" },
  { id: "activity", label: "활동・교육" },
];

function ResumeBuilder() {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title") ?? "새 이력서";

  const [otherBlocks, setOtherBlocks] = useState<Block[]>(INITIAL_OTHER_BLOCKS);
  const [zoomLevel, setZoomLevel] = useState(100);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOtherBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));

  return (
    <FlexBox sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Left Panel */}
      <FlexBox
        flexDirection="column"
        gap="20px"
        sx={{
          width: "280px",
          flexShrink: 0,
          borderRight: "1px solid var(--atomic-coolNeutral-95)",
          padding: "20px 16px",
          overflowY: "auto",
          background: "var(--semantic-background-elevated-normal)",
        }}
      >
        <Typography variant="headline1" weight="bold" sx={{ padding: "0 4px" }}>
          {titleParam}
        </Typography>

        {/* Basic Info Section */}
        <FlexBox flexDirection="column" gap="8px">
          <Typography
            variant="label2"
            weight="bold"
            sx={{
              color: "var(--semantic-label-alternative)",
              padding: "0 4px",
            }}
          >
            기본 정보
          </Typography>
          {BASIC_BLOCKS.map((block) => (
            <FlexBox
              key={block.id}
              alignItems="center"
              gap="8px"
              sx={{
                padding: "10px 12px",
                borderRadius: "8px",
                background: "var(--semantic-background-normal-alternative)",
                border: "1px solid var(--atomic-coolNeutral-95)",
              }}
            >
              <FlexBox
                alignItems="center"
                sx={{ color: "var(--semantic-label-disable)" }}
              >
                <IconHandleDesktop width={16} height={16} />
              </FlexBox>
              <Typography variant="body2" weight="regular">
                {block.label}
              </Typography>
            </FlexBox>
          ))}
        </FlexBox>

        {/* Other Blocks Section (draggable) */}
        <FlexBox flexDirection="column" gap="8px">
          <Typography
            variant="label2"
            weight="bold"
            sx={{
              color: "var(--semantic-label-alternative)",
              padding: "0 4px",
            }}
          >
            블록
          </Typography>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={otherBlocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <FlexBox flexDirection="column" gap="8px">
                {otherBlocks.map((block) => (
                  <SortableBlockItem
                    key={block.id}
                    id={block.id}
                    label={block.label}
                  />
                ))}
              </FlexBox>
            </SortableContext>
          </DndContext>
        </FlexBox>
      </FlexBox>

      {/* Right Panel */}
      <FlexBox
        flexDirection="column"
        sx={{
          flex: 1,
          overflow: "hidden",
          background: "var(--semantic-background-normal-alternative)",
        }}
      >
        {/* Header */}
        <FlexBox
          alignItems="center"
          justifyContent="flex-end"
          gap="8px"
          sx={{
            padding: "12px 24px",
            borderBottom: "1px solid var(--atomic-coolNeutral-95)",
            background: "var(--semantic-background-elevated-normal)",
            flexShrink: 0,
          }}
        >
          <Button variant="outlined" color="assistive" size="small">
            임시저장
          </Button>
          <Button size="small">공유하기</Button>
        </FlexBox>

        {/* PDF Viewer */}
        <FlexBox
          alignItems="center"
          justifyContent="center"
          sx={{ flex: 1, overflow: "auto", padding: "24px" }}
        >
          <FlexBox
            alignItems="center"
            justifyContent="center"
            sx={{
              width: `${595 * (zoomLevel / 100)}px`,
              minHeight: `${842 * (zoomLevel / 100)}px`,
              background: "white",
              boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              borderRadius: "4px",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="body2"
              weight="regular"
              sx={{ color: "var(--semantic-label-alternative)" }}
            >
              PDF 미리보기
            </Typography>
          </FlexBox>
        </FlexBox>

        {/* PDF Controls */}
        <FlexBox
          alignItems="center"
          justifyContent="center"
          gap="8px"
          sx={{
            padding: "12px 24px",
            borderTop: "1px solid var(--atomic-coolNeutral-95)",
            background: "var(--semantic-background-elevated-normal)",
            flexShrink: 0,
          }}
        >
          <Button variant="outlined" color="assistive" size="small">
            전체보기
          </Button>
          <IconButton size="small" onClick={handleZoomOut}>
            <IconMinus width={16} height={16} />
          </IconButton>
          <Typography
            variant="label2"
            weight="regular"
            sx={{ minWidth: "40px", textAlign: "center" }}
          >
            {zoomLevel}%
          </Typography>
          <IconButton size="small" onClick={handleZoomIn}>
            <IconPlus width={16} height={16} />
          </IconButton>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ResumeBuilder />
    </Suspense>
  );
}
