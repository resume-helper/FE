import { useMutation } from "@tanstack/react-query";
import { postRefresh } from "@/features/auth/api/api";
import type { PostRefreshRes } from "@/features/auth/types/auth";

// Access Token 갱신
export function useRefresh() {
  return useMutation<PostRefreshRes, Error>({
    mutationFn: postRefresh,
  });
}
