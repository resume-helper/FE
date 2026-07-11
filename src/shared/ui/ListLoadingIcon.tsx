"use client";

import { Spinner } from "@/shared/ui/Spinner";

export const ListLoadingIcon = () => {
  return (
    <li className="relative h-[50px] w-full">
      <Spinner className="absolute top-1/2 left-1/2 -translate-1/2" />
    </li>
  );
};
