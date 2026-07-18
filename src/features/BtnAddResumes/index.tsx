"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { BackgroundLayer } from "@/shared/ui/BackgroundLayer";

import { SelectResumesTypeBox } from "./ui/SelectResumesTypeBox";
import { Button } from "@/shared/ui/Button";

interface BTN_ADD_RESUMES extends COMPONENT_CLASS_NAME {
  type?: "PDF" | "WEB";
}

export const BtnAddResumes = ({ type, className }: BTN_ADD_RESUMES) => {
  const [isAdd, SetIsAdd] = useState(false);

  const navigation = useRouter();

  const searchParams = useSearchParams();

  function OnClickResumesAddCallback() {
    if (type) {
      navigation.push(`/r/resumes/${type}/add?${searchParams.toString()}`);
    } else {
      SetIsAdd(true);
    }
  }

  return (
    <>
      <Button
        className={className ?? ""}
        size={"large"}
        onClick={OnClickResumesAddCallback}
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
