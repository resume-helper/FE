import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContentBadge } from "@/shared/ui/ContentBadge";

const meta = {
  title: "UI/ContentBadge",
  component: ContentBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Badge",
    size: "xsmall",
    variant: "solid",
    color: "accent",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["xsmall", "small", "medium"] },
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
    color: { control: "inline-radio", options: ["neutral", "accent"] },
  },
} satisfies Meta<typeof ContentBadge>;

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
      <ContentBadge {...args} size="xsmall">
        Xsmall
      </ContentBadge>
      <ContentBadge {...args} size="small">
        Small
      </ContentBadge>
      <ContentBadge {...args} size="medium">
        Medium
      </ContentBadge>
    </div>
  ),
};
