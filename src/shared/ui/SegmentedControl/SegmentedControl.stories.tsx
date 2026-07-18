import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SegmentedControl } from "@/shared/ui/SegmentedControl";

const options = [
  { value: "day", label: "일간" },
  { value: "week", label: "주간" },
  { value: "month", label: "월간" },
];

const meta = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  args: {
    options,
    defaultValue: "week",
    size: "large",
    variant: "solid",
    "aria-label": "조회 기간",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    variant: { control: "inline-radio", options: ["solid", "outlined"] },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Outlined: Story = { args: { variant: "outlined" } };
