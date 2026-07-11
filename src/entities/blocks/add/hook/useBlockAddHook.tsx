"use client";

import { useMutation } from "@tanstack/react-query";
import { API_CLIENT_BLOCKS_ADD } from "../api/api.client.blocks.add";
import { useRouter } from "next/navigation";

export const useBlockAddHook = () => {
  const navigation = useRouter();

  return useMutation({
    mutationKey: ["block", "add"],
    mutationFn: (param: API_BLOCKS_ADD_PARAM) => API_CLIENT_BLOCKS_ADD(param),
    onSuccess(data, variables, _, context) {
      if (!data) {
        console.log(variables); /** 호출시 전달한 값 */
        return alert("등록 실패");
      }

      context.client.invalidateQueries({ queryKey: ["blocks", "list"] });
      context.client.invalidateQueries({
        queryKey: ["blocks", "list", "counts"],
      });

      navigation.push("/r/blocks");
    },
  });
};
