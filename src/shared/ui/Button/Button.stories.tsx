import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "large",
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
    color: { control: "inline-radio", options: ["primary", "assistive"] },
    size: { control: "inline-radio", options: ["large", "medium", "small"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Assistive: Story = {
  args: { color: "assistive" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};

// polymorphic: next/link로 렌더링 (as 사용)
export const AsNextLink: Story = {
  args: { children: "Go to home" },
  render: (args) => (
    <Button as={Link} href="/">
      {args.children}
    </Button>
  ),
};
