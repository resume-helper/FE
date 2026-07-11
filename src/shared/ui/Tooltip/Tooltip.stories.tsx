import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Hover: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <button className="rounded-lg border px-4 py-2">
          마우스를 올려보세요
        </button>
      </TooltipTrigger>
      <TooltipContent>도움말 메시지</TooltipContent>
    </Tooltip>
  ),
};
export const Always: Story = {
  render: () => (
    <Tooltip mode="always">
      <TooltipTrigger>
        <button className="rounded-lg border px-4 py-2">항상 표시</button>
      </TooltipTrigger>
      <TooltipContent closeButton>닫을 수 있는 도움말</TooltipContent>
    </Tooltip>
  ),
};
