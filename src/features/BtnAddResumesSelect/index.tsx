"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { BackgroundLayer } from "@/shared/ui/BackgroundLayer";

import { SelectResumesTypeBox } from "./ui/SelectResumesTypeBox";
import { Button } from "@/shared/ui/Button";

export const BtnAddResumesSelect = ({ className }: COMPONENT_CLASS_NAME) => {
  const [isAdd, SetIsAdd] = useState(false);

  return (
    <>
      <Button
        className={className ?? ""}
        size={"large"}
        onClick={() => SetIsAdd(true)}
      >
        이력서 생성
      </Button>
      {isAdd && (
        <BackgroundLayer>
          <SelectResumesTypeBox cancelCallback={() => SetIsAdd(false)} />
        </BackgroundLayer>
      )}
    </>
  );
};
