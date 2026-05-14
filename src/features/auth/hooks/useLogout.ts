import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "@/features/auth/api/api";
import type { PostLogoutRes } from "@/features/auth/types/auth";
import { useAuthStore } from "@/features/auth/store/authStore";
import { authKeys } from "@/features/auth/hooks/useMe";

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((s) => s.clearUser);

  return useMutation<PostLogoutRes, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.me });
      clearUser();
    },
  });
}
