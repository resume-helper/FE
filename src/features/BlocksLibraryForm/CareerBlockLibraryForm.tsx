"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";
import { Select, SelectItem } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";

import { TextField } from "@/shared/ui/TextField";

import { FormTypeBtnList } from "./ui/FormTypeBtnList";
import { FormHead } from "./ui/FormHead";
import { zodResolver } from "@hookform/resolvers/zod";
import { CareerBlocksSchema } from "@/entities/blocks/add/model/blocks.add.model";
import { useBlockAddHook } from "@/entities/blocks/add/hook/useBlockAddHook";

export const CareerBlockLibraryForm = () => {
  const { handleSubmit, register, control, watch } = useForm({
    resolver: zodResolver(CareerBlocksSchema),
    defaultValues: {
      blocks: [
        {
          blockType: "CAREER",
          title: "",
          contentJson: {
            companyName: undefined,
            department: undefined,
            jobTitle: undefined,
            position: undefined,
            employmentType: undefined,
            startDate: undefined,
            endDate: undefined,
            achievements: undefined,
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "blocks",
  });

  const { mutateAsync } = useBlockAddHook();

  function OnClickValueAppendCallback() {
    append({
      blockType: "CAREER",
      title: watch().blocks[0].title,
      contentJson: {
        companyName: "",
        department: "",
        jobTitle: "",
        position: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        achievements: "",
      },
    });
  }

  function OnSubmitCallback(data: CAREER_BLOCKS_FORM_ITEM) {
    mutateAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(OnSubmitCallback)}>
      <FormHead title="경력" />
      <FormTypeBtnList />
      <ul className="w-full space-y-[20px]">
        {fields.map((el, i) => {
          return (
            <li
              key={el.id}
              className="space-y-[20px] rounded-[12px] bg-[#fff] p-[20px] shadow-[0_4px_6px_-1px_#1717170F,0_2px_4px_-2px_#1717170F]"
            >
              {i === 0 && (
                <TextField
                  required
                  label={"블록명"}
                  {...register(`blocks.${i}.title`)}
                />
              )}
              <TextField
                required
                label={"회사명"}
                {...register(`blocks.${i}.contentJson.companyName`)}
              />
              <div className="flex w-full gap-[8px]">
                <Controller
                  control={control}
                  name={`blocks.${i}.contentJson.employmentType`}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      className="w-[25%]"
                      requiredBadge
                      label={"재직형태"}
                    >
                      <SelectItem value="FULL_TIME">정규직</SelectItem>
                      <SelectItem value="CONTRACT">계약직</SelectItem>
                      <SelectItem value="INTERN">인턴</SelectItem>
                      <SelectItem value="FREELANCER">프리랜서</SelectItem>
                    </Select>
                  )}
                />

                <TextField
                  {...register(`blocks.${i}.contentJson.department`)}
                  className="w-[25%]"
                  required
                  label={"근무부서"}
                  placeholder="예시) 개발팀"
                />
                <TextField
                  {...register(`blocks.${i}.contentJson.jobTitle`)}
                  className="w-[25%]"
                  required
                  label={"직무"}
                  placeholder="예시) 디자이너"
                />
                <TextField
                  {...register(`blocks.${i}.contentJson.position`)}
                  className="w-[25%]"
                  required
                  label={"직급/직책"}
                  placeholder="직급/직책"
                />
              </div>
              <div className="flex w-full items-end gap-[8px]">
                <TextField
                  {...register(`blocks.${i}.contentJson.startDate`)}
                  type="month"
                  className="w-[395px]"
                  required
                  label={"입사년월"}
                />

                <TextField
                  {...register(`blocks.${i}.contentJson.endDate`)}
                  type="month"
                  className="w-[395px]"
                  required
                  label={"퇴사년월"}
                />
                <CheckBox label={"재직중"} className="w-[74px]" />
              </div>
              {/* <QuillEditor isToolbarHide={true}/> */}
              <TextArea
                {...register(`blocks.${i}.contentJson.achievements`)}
                className="min-h-[154px] w-full"
                requiredBadge
                label={"주요성과"}
              />
            </li>
          );
        })}
      </ul>
      <Button
        onClick={OnClickValueAppendCallback}
        className="mt-[8px] w-full border-[#70737C29] bg-[#fff]"
        variant={"outlined"}
        color={"assistive"}
        type="button"
      >
        추가
      </Button>
    </form>
  );
};
