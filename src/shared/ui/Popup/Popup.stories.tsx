import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Popup,
  PopupActionArea,
  PopupActionButton,
  PopupContainer,
  PopupContent,
  PopupContentItem,
  PopupDescription,
  PopupHeading,
  PopupNavigation,
  PopupTrigger,
} from "@/shared/ui/Popup";

const meta = {
  title: "UI/Popup",
  component: Popup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { children: null },
  render: () => (
    <Popup>
      <PopupTrigger asChild>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
          팝업 열기
        </button>
      </PopupTrigger>
      <PopupContainer>
        <PopupNavigation>팝업 제목</PopupNavigation>
        <PopupContent>
          <PopupContentItem>
            <PopupHeading>콘텐츠 제목</PopupHeading>
            <PopupDescription>팝업의 상세 설명입니다.</PopupDescription>
          </PopupContentItem>
        </PopupContent>
        <PopupActionArea>
          <PopupActionButton fullWidth>확인</PopupActionButton>
        </PopupActionArea>
      </PopupContainer>
    </Popup>
  ),
};
