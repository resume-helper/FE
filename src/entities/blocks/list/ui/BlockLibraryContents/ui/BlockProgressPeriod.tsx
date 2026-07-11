"use client";

import { DateFormat } from "@/shared/util/dateFormat";

/** 진행 기간 */
export const BlockProgressPeriod = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return (
    <span>
      {DateFormat(startDate, "yyyy-mm")} - {DateFormat(endDate, "yyyy-mm")}
    </span>
  );
};
