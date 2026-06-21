"use client";

import { useAlertStore } from "@/shared/store/alertStore";
import {
  Alert,
  AlertContainer,
  AlertContent,
  AlertHeading,
  AlertDescription,
  AlertActionArea,
  AlertActionAreaButton,
} from "@/shared/ui/Alert";

export function GlobalAlert() {
  const { open, options, close } = useAlertStore();

  if (!options) return null;

  const {
    title,
    content,
    confirm,
    cancel,
    direction = "normal",
    heading = true,
  } = options;

  const confirmButton = (
    <AlertActionAreaButton
      variant={confirm.variant ?? "normal"}
      onClick={() => close("confirm")}
    >
      {confirm.label}
    </AlertActionAreaButton>
  );

  const cancelButton = (
    <AlertActionAreaButton
      variant={cancel.variant ?? "assistive"}
      onClick={() => close("cancel")}
    >
      {cancel.label}
    </AlertActionAreaButton>
  );

  return (
    <Alert
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close("cancel");
      }}
    >
      <AlertContainer>
        <AlertContent heading={heading}>
          <AlertHeading>{title}</AlertHeading>
          <AlertDescription>{content}</AlertDescription>
          <AlertActionArea>
            {direction === "reverse" ? (
              <>
                {confirmButton}
                {cancelButton}
              </>
            ) : (
              <>
                {cancelButton}
                {confirmButton}
              </>
            )}
          </AlertActionArea>
        </AlertContent>
      </AlertContainer>
    </Alert>
  );
}
