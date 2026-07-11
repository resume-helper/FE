import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleIcon } from "@/shared/ui/ToggleIcon";

const meta = {
  title: "UI/ToggleIcon",
  component: ToggleIcon,
  parameters: { layout: "centered" },
  args: { active: false },
  argTypes: { active: { control: "boolean" } },
} satisfies Meta<typeof ToggleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Active: Story = { args: { active: true } };
