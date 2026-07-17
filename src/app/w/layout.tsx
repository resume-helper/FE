import { QueryProvider } from "@/provider/QueryProvider";

/** 공개 열람 라우트 (/w/*) — 로그인 게이트 없음 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
