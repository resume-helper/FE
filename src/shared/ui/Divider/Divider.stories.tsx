import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "@/shared/ui/Divider";

const meta = {
  title: "UI/Divider",
  component: Divider,
  parameters: { layout: "centered" },
  args: { variant: "normal", vertical: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["normal", "thick"] },
    vertical: { control: "boolean" },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Vertical: Story = { args: { vertical: true } };
