import { Suspense } from "react";
import styled from "styled-components";
import Header from "@/shared/components/Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  min-height: calc(100vh - 56px);
`;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Suspense>
        <Header />
      </Suspense>
      <Main>{children}</Main>
    </Wrapper>
  );
}
