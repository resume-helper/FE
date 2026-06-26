"use client";

import { DateFormat } from "@/shared/util/dateFormat";

export const BlockLibraryProjectItem = ({
  item,
}: {
  item: PROJECT_BLOCK_ITEM;
}) => {
  return (
    <div className="space-y-[8px]">
      <p className="text-[0.8125rem] text-[#37383C9C]">
        {DateFormat(item.startDate, "yyyy-mm")} -{" "}
        {DateFormat(item.endDate, "yyyy-mm")}
      </p>
      <p className="line-clamp-2 h-[48px] w-full text-[0.9375rem] text-[#2E2F33E0]">
        {item.problemSolving}
      </p>
    </div>
  );
};

export const BlockLibrarySkillItem = ({ item }: { item: SKILL_BLOCK_ITEM }) => {
  return <div className="space-y-[8px]"></div>;
};
