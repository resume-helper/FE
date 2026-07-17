"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Select } from "@/shared/ui/Select";
import { TextField } from "@/shared/ui/TextField";

/** RHF Controller + shared/ui TextField 연결 (에러 메시지 = description) */
export function RhfTextField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  placeholder,
  tip,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  /** 작성팁 (기획 8.2.10) — 라벨 옆 툴팁 텍스트 */
  tip?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          label={tip ? <span title={tip}>{label}</span> : label}
          required={required}
          placeholder={placeholder}
          status={fieldState.error ? "invalid" : "default"}
          description={fieldState.error?.message}
          value={(field.value as string) ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          onClear={() => field.onChange("")}
        />
      )}
    />
  );
}

/** RHF Controller + shared/ui Select 연결 */
export function RhfSelect<T extends FieldValues>({
  control,
  name,
  label,
  required,
  placeholder,
  options,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          label={label}
          requiredBadge={required}
          placeholder={placeholder ?? "선택해주세요"}
          status={fieldState.error ? "invalid" : "normal"}
          description={fieldState.error?.message}
          options={options.map((o) => ({ value: o.value, label: o.label }))}
          value={(field.value as string) ?? undefined}
          onValueChange={field.onChange}
        />
      )}
    />
  );
}
