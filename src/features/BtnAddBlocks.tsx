"use client";

import { Button } from "@/shared/ui/Button";
import Link from "next/link";

export const BtnAddBlocks = () => {
  return (
    <Button
      as={Link}
      href="/r/blocks/add?blockType=BASIC_INFO"
      size={"large"}
      variant={"outlined"}
      color={"primary"}
    >
      블록 생성
    </Button>
  );
};
