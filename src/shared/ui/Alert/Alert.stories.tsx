import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Alert,
  AlertActionArea,
  AlertActionAreaButton,
  AlertContainer,
  AlertContent,
  AlertDescription,
  AlertHeading,
  AlertTrigger,
} from "@/shared/ui/Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTrigger asChild>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
          알림 열기
        </button>
      </AlertTrigger>
      <AlertContainer>
        <AlertContent>
          <AlertHeading>변경사항을 저장할까요?</AlertHeading>
          <AlertDescription>저장하지 않은 내용은 사라집니다.</AlertDescription>
          <AlertActionArea>
            <AlertActionAreaButton variant="assistive">
              취소
            </AlertActionAreaButton>
            <AlertActionAreaButton>저장</AlertActionAreaButton>
          </AlertActionArea>
        </AlertContent>
      </AlertContainer>
    </Alert>
  ),
};
