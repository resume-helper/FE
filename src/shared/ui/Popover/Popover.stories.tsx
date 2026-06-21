import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";

const meta = {
  title: "UI/Popover",
  component: Popover,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button className="rounded-lg border px-4 py-2">Popover 열기</button>
      </PopoverTrigger>
      <PopoverContent heading="안내" closeButton>
        Popover 본문입니다.
      </PopoverContent>
    </Popover>
  ),
};
