"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { BasicInfoBlockLibraryForm } from "@/features/BlocksLibraryForm/BasicInfoBlockLibraryForm";
import { CareerBlockLibraryForm } from "@/features/BlocksLibraryForm/CareerBlockLibraryForm";

import { ChevronLeft } from "@/shared/icons";
import { TextButton } from "@/shared/ui/TextButton";

export const BlockLibraryFormBox = () => {
  const searchParams = useSearchParams();

  const currentBlockType =
    (searchParams.get("blockType") as BLOCK_TYPE | null) ?? "BASIC_INFO";

  const navigation = useRouter();

  function OnClickBackCallback() {
    navigation.back();
  }

  return (
    <>
      <TextButton
        onClick={OnClickBackCallback}
        className="flex items-center font-[600] text-[#37383C9C]"
      >
        <ChevronLeft className="size-[20px]" />
        뒤로가기
      </TextButton>
      <section>
        <h2 className="sr-only">블록 라이브러리 등록 폼</h2>
        {currentBlockType === "BASIC_INFO" && <BasicInfoBlockLibraryForm />}
        {currentBlockType === "CAREER" && <CareerBlockLibraryForm />}
      </section>
    </>
  );
};
