import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextButton } from "@/shared/ui/TextButton";
import { ChevronRight, Download } from "@/shared/icons";

const meta = {
  title: "UI/TextButton",
  component: TextButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Text Button",
    color: "primary",
    size: "medium",
    loading: false,
    disabled: false,
  },
  argTypes: {
    color: { control: "inline-radio", options: ["primary", "assistive"] },
    size: { control: "inline-radio", options: ["medium", "small"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Assistive: Story = {
  args: { color: "assistive" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Download />, children: "다운로드" },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <ChevronRight />, children: "더보기" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <TextButton {...args} size="small">
        Small
      </TextButton>
      <TextButton {...args} size="medium">
        Medium
      </TextButton>
    </div>
  ),
};
