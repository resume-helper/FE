"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSessionHook } from "@/entities/auth/social-login/hook/useSessionHook";

import { BasicInfoBlocksSchema } from "@/entities/blocks/add/model/blocks.add.model";

import { TextField } from "@/shared/ui/TextField";
import { FormTypeBtnList } from "./ui/FormTypeBtnList";
import { FormHead } from "./ui/FormHead";
import { useBlockAddHook } from "@/entities/blocks/add/hook/useBlockAddHook";

export const BasicInfoBlockLibraryForm = () => {
  const { user } = useSessionHook();

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(BasicInfoBlocksSchema),
    defaultValues: {
      blocks: [
        {
          blockType: "BASIC_INFO",
          title: undefined,
          contentJson: {
            name: undefined,
            email: undefined,
            phoneNumber: undefined,
            profileImage: "",
          },
        },
      ],
    },
  });

  const { mutateAsync } = useBlockAddHook();

  function OnSubmitCallback(data: BASIC_INFO_BLOCKS_FORM_ITEM) {
    mutateAsync(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmitCallback)}>
        <FormHead title="기본정보" />
        <FormTypeBtnList />
        <article className="space-y-[20px] rounded-[12px] bg-[#fff] p-[20px] shadow-[0_4px_6px_-1px_#1717170F,0_2px_4px_-2px_#1717170F]">
          <h2 className="sr-only">기본정보 블록 입력 폼</h2>
          <TextField
            {...register("blocks.0.title")}
            required
            label={"블록명"}
          />
          <TextField
            {...register("blocks.0.contentJson.name")}
            required
            label={"이름"}
            defaultValue={user?.name ?? ""}
          />
          <TextField
            {...register("blocks.0.contentJson.email")}
            required
            label={"이메일"}
            placeholder="ex) email@gmail.com"
          />
          <TextField
            {...register("blocks.0.contentJson.phoneNumber")}
            required
            label={"폰번호"}
            placeholder="ex) 010-0000-0000"
          />
        </article>
      </form>
    </>
  );
};
