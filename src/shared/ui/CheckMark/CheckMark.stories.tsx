import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckMark } from "@/shared/ui/CheckMark";

const meta = {
  title: "UI/CheckMark",
  component: CheckMark,
  parameters: { layout: "centered" },
  args: { id: "checkmark", label: "선택 항목", size: "medium", tight: false },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium"] },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof CheckMark>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
