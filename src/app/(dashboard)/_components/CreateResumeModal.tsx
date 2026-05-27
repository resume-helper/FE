"use client";

import { useState } from "react";
import {
  Alert,
  AlertTrigger,
  AlertContainer,
  AlertContent,
  AlertHeading,
  AlertActionArea,
  Button,
  FlexBox,
  Typography,
} from "@wanteddev/wds";

const TEMPLATES = [
  { id: 1, name: "타입1", description: "타입1 설명" },
  { id: 2, name: "타입2", description: "타입2 설명" },
  { id: 3, name: "타입3", description: "타입3 설명" },
];

interface CreateResumeModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateResumeModal({
  children,
  open: openProp,
  onOpenChange,
}: CreateResumeModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <Alert open={open} onOpenChange={setOpen}>
      {children && <AlertTrigger>{children}</AlertTrigger>}
      <AlertContainer sx={[{ width: "720px", maxWidth: "720px" }]}>
        <AlertContent>
          <AlertHeading>이력서 제작하기</AlertHeading>
          <FlexBox flexDirection="column" gap="16px" sx={{ marginTop: "16px" }}>
            <Typography variant="body2" weight="regular">
              이력서 템플릿을 선택해주세요.
            </Typography>
            <FlexBox gap="12px">
              {TEMPLATES.map((template) => (
                <FlexBox
                  key={template.id}
                  flexDirection="column"
                  gap="8px"
                  onClick={() => setSelectedTemplate(template.id)}
                  sx={{
                    flex: 1,
                    padding: "16px",
                    border: `2px solid ${
                      selectedTemplate === template.id
                        ? "var(--semantic-primary-normal)"
                        : "var(--atomic-coolNeutral-95)"
                    }`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    background:
                      selectedTemplate === template.id
                        ? "var(--semantic-primary-weak-normal)"
                        : "var(--semantic-background-elevated-normal)",
                  }}
                >
                  <Typography variant="body2" weight="bold">
                    {template.name}
                  </Typography>
                  <Typography
                    variant="label2"
                    weight="regular"
                    sx={{ color: "var(--semantic-label-alternative)" }}
                  >
                    {template.description}
                  </Typography>
                </FlexBox>
              ))}
            </FlexBox>
          </FlexBox>
        </AlertContent>
        <AlertActionArea justifyContent="flex-end" gap="8px">
          <Button variant="outlined" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </AlertActionArea>
      </AlertContainer>
    </Alert>
  );
}
