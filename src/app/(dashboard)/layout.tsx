import styled from "styled-components";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DashboardHeader } from "./_components/DashboardHeader";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <DashboardSidebar />
      <ContentArea>
        <DashboardHeader />
        <Main>
          <Inner>{children}</Inner>
        </Main>
      </ContentArea>
    </Wrapper>
  );
}
