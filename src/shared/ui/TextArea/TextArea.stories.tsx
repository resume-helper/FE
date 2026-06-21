import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextArea } from "@/shared/ui/TextArea";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "내용",
    placeholder: "내용을 입력해 주세요.",
    description: "최대 200자까지 입력할 수 있습니다.",
    maxLength: 200,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Invalid: Story = {
  args: { status: "invalid", description: "내용을 입력해 주세요." },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "수정할 수 없는 내용" },
};
