import { Suspense } from "react";
import Header from "@/shared/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <Suspense>
        <Header />
      </Suspense>

      {/* 메인 */}
      <main className="min-h-[calc(100vh-56px)] flex-1">{children}</main>
    </div>
  );
}
