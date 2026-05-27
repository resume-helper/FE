"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  TextField,
  Typography,
} from "@wanteddev/wds";

const TEMPLATES = [
  { id: 1, name: "타입1", description: "타입1 설명" },
  { id: 2, name: "타입2", description: "타입2 설명" },
  { id: 3, name: "타입3", description: "타입3 설명" },
];

interface CreateResumeModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateResumeModal({
  open = false,
  onOpenChange,
}: CreateResumeModalProps) {
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleClose = () => {
    setTitle("");
    setSelectedTemplate(null);
    onOpenChange?.(false);
  };

  const handleConfirm = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (selectedTemplate) params.set("templateId", String(selectedTemplate));
    handleClose();
    window.open(`/resume/create?${params.toString()}`, "_blank");
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Dimmer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.43)",
        }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <FlexBox
        flexDirection="column"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "720px",
          maxWidth: "100%",
          background: "var(--semantic-background-elevated-normal)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <FlexBox flexDirection="column" gap="20px" sx={{ padding: "20px" }}>
          <Typography variant="headline1" weight="bold">
            이력서 제작하기
          </Typography>

          <FormField>
            <FormLabel required>이력서 제목</FormLabel>
            <FormControl>
              <TextField
                width="100%"
                placeholder="이력서 제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
          </FormField>

          <FlexBox flexDirection="column" gap="8px">
            <Typography variant="label1" weight="medium">
              템플릿 선택
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
        </FlexBox>

        {/* Action Area */}
        <FlexBox
          justifyContent="flex-end"
          gap="8px"
          sx={{ padding: "0 20px 12px" }}
        >
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </FlexBox>
      </FlexBox>
    </div>,
    document.body
  );
}
