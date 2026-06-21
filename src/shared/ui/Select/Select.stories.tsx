import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select, SelectItem } from "@/shared/ui/Select";

const meta = {
  title: "UI/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "직군",
    placeholder: "직군을 선택하세요",
    description: "하나를 선택해 주세요.",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: (
      <>
        <SelectItem value="design">디자인</SelectItem>
        <SelectItem value="frontend">프론트엔드</SelectItem>
        <SelectItem value="backend">백엔드</SelectItem>
      </>
    ),
  },
};
export const Invalid: Story = {
  ...Default,
  args: { ...Default.args, status: "invalid", description: "필수 항목입니다." },
};
