"use client";

import { Button } from "@/shared/ui/Button";

export const BtnAddBlocks = () => {
  return (
    <Button
      as="a"
      href="/r/blocks/add"
      size={"large"}
      variant={"outlined"}
      color={"primary"}
    >
      블록 생성
    </Button>
  );
};
