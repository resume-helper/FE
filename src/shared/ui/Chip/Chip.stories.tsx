import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "@/shared/ui/Chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Chip",
    variant: "solid",
    size: "medium",
    active: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
    size: {
      control: "inline-radio",
      options: ["xsmall", "small", "medium", "large"],
    },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Active: Story = {
  args: { active: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Chip {...args} size="xsmall">
        Xsmall
      </Chip>
      <Chip {...args} size="small">
        Small
      </Chip>
      <Chip {...args} size="medium">
        Medium
      </Chip>
      <Chip {...args} size="large">
        Large
      </Chip>
    </div>
  ),
};
