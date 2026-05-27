"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FlexBox, Typography } from "@wanteddev/wds";
import { IconHandleDesktop } from "@wanteddev/wds-icon";

interface SortableBlockItemProps {
  id: string;
  label: string;
}

export function SortableBlockItem({ id, label }: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <FlexBox
      ref={setNodeRef}
      alignItems="center"
      gap="8px"
      sx={{
        padding: "10px 12px",
        borderRadius: "8px",
        background: "var(--semantic-background-elevated-normal)",
        border: "1px solid var(--atomic-coolNeutral-95)",
        cursor: "default",
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <FlexBox
        {...attributes}
        {...listeners}
        alignItems="center"
        sx={{
          cursor: "grab",
          color: "var(--semantic-label-alternative)",
          touchAction: "none",
          "&:active": { cursor: "grabbing" },
        }}
      >
        <IconHandleDesktop width={16} height={16} />
      </FlexBox>
      <Typography variant="body2" weight="regular">
        {label}
      </Typography>
    </FlexBox>
  );
}
