import { API_SERVER_MYPAGE_ME } from "@/entities/auth/mypage/api/api.server.mypage";
import { withAuthRetry } from "@/shared/api/api.server.withAuthRetry";

export async function POST() {
  return withAuthRetry(() => API_SERVER_MYPAGE_ME());
}
