"use client";

import { useResumseListHook } from "@/entities/resumes/list/hook/useResumseListHook";

import { LatestResumesWebListEmpty } from "@/entities/resumes/list/ui/LatestResumesWebListEmpty";

import { Spinner } from "@/shared/ui/Spinner";
import { List } from "@/shared/ui/ListCell";

export const LatestResumesWebList = () => {
  const { latest, isLoading } = useResumseListHook("WEB");

  return (
    <List>
      {isLoading && (
        <li className="mt-[50px] text-center">
          <Spinner className="inline-block" />
        </li>
      )}

      {latest?.length === 0 ? (
        <LatestResumesWebListEmpty />
      ) : (
        latest?.map((el, i) => {
          return (
            <li className="h-[78px]" key={`최근등록한-WEB-이력서-${i}`}>
              <dl className="pt-[16px]">
                <dt className="truncate text-[1.0625rem] font-[500]">
                  {el["title"]}
                </dt>
                <dd className="space-x-[10px] text-[0.8125rem] font-[400] text-[#37383C9C]">
                  <span>조회수 842</span>
                  <span>체류시간 00초</span>
                  <span>별점 4.2</span>
                </dd>
              </dl>
            </li>
          );
        })
      )}
    </List>
  );
};
