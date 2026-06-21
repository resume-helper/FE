import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/shared/ui/Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    text: "Badge",
    size: "xsmall",
    variant: "solid",
    color: "accent",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["xsmall", "small", "medium"] },
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
    color: { control: "inline-radio", options: ["neutral", "accent"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};

export const Neutral: Story = {
  args: { color: "neutral" },
};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} size="xsmall" text="Xsmall" />
      <Badge {...args} size="small" text="Small" />
      <Badge {...args} size="medium" text="Medium" />
    </div>
  ),
};
