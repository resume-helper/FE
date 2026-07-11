"use client";

import { useMutation } from "@tanstack/react-query";
import { API_CLIENT_RESUMSES_DELETE } from "../api/api.client.resumes.delete";
import { useResumsesDeleteStore } from "../store/useResumsesDeleteStore";

export const useResumesDeleteHook = (type: "WEB" | "PDF") => {
  const ResetDeleteStore = useResumsesDeleteStore(
    (state) => state.ResetDeleteStore
  );

  const { mutateAsync: SubmitDeleteResumseCallback } = useMutation({
    mutationKey: ["mutation", "delete", "resumes"],
    mutationFn: (param: number[]) => API_CLIENT_RESUMSES_DELETE(param),
    onSuccess(data, variables, onMutateResult, context) {
      if (data) {
        ResetDeleteStore();
        context.client.invalidateQueries({
          queryKey: ["resumes", "list", type],
        });
      } else {
      }
    },
    onError(error, variables, onMutateResult, context) {},
  });

  return {
    SubmitDeleteResumseCallback,
  };
};
