import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckBox } from "@/shared/ui/CheckBox";

const meta = {
  title: "UI/CheckBox",
  component: CheckBox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "동의합니다",
    size: "medium",
    bold: false,
    right: false,
    tight: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium"] },
    bold: { control: "boolean" },
    right: { control: "boolean" },
    tight: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { defaultChecked: false },
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};
