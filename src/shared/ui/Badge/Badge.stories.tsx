import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/shared/ui/Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  args: { text: "Badge", variant: "solid", size: "small", color: "neutral" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
    size: { control: "inline-radio", options: ["xsmall", "small", "medium"] },
    color: { control: "inline-radio", options: ["neutral", "accent"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Accent: Story = { args: { color: "accent" } };
