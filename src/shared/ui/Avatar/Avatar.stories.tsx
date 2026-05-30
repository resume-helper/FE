import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/shared/ui/Avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "person",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["person", "company", "academy"],
    },
    size: {
      control: "inline-radio",
      options: ["xsmall", "small", "medium", "large", "xlarge"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Person: Story = {};

export const Company: Story = {
  args: { variant: "company" },
};

export const Academy: Story = {
  args: { variant: "academy" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      <Avatar {...args} size="xsmall" />
      <Avatar {...args} size="small" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="large" />
      <Avatar {...args} size="xlarge" />
    </div>
  ),
};
