import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell } from "@/shared/icons";
import { Select, SelectItem } from "@/shared/ui/Select";

const options = (
  <>
    <SelectItem value="design">디자인</SelectItem>
    <SelectItem value="frontend">프론트엔드</SelectItem>
    <SelectItem value="backend">백엔드</SelectItem>
  </>
);

const chipOptions = [
  { value: "design", label: "텍스트" },
  { value: "frontend", label: "텍스트" },
  { value: "backend", label: "텍스트" },
];

const meta = {
  title: "UI/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    children: options,
    label: "주제",
    placeholder: "선택해주세요.",
    heading: true,
    requiredBadge: false,
    status: "normal",
    render: "text",
    overflow: false,
    disabled: false,
  },
  argTypes: {
    status: {
      control: "inline-radio",
      options: ["normal", "negative", "invalid"],
    },
    render: { control: "inline-radio", options: ["text", "chip"] },
    heading: { control: "boolean" },
    requiredBadge: { control: "boolean" },
    overflow: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { defaultValue: "frontend" },
};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Negative: Story = {
  args: {
    status: "negative",
    description: "메시지에 마침표를 찍어요.",
  },
};

export const Invalid: Story = {
  args: {
    status: "invalid",
    description: "메시지에 마침표를 찍어요.",
  },
};

export const NegativeActive: Story = {
  args: {
    status: "negative",
    defaultValue: "frontend",
    description: "메시지에 마침표를 찍어요.",
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledActive: Story = {
  args: { disabled: true, defaultValue: "frontend" },
};

export const WithoutHeading: Story = {
  args: { heading: false },
};

export const Required: Story = {
  args: { requiredBadge: true },
};

export const WithDescription: Story = {
  args: { description: "메시지에 마침표를 찍어요." },
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Bell /> },
};

export const ChipRender: Story = {
  args: {
    render: "chip",
    options: chipOptions,
    defaultValue: chipOptions.map((option) => option.value),
  },
};

export const ChipOverflow: Story = {
  args: {
    render: "chip",
    overflow: true,
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index),
      label: `텍스트 ${index + 1}`,
    })),
    defaultValue: Array.from({ length: 10 }, (_, index) => String(index)),
  },
};

export const TextOverflow: Story = {
  args: {
    overflow: true,
    defaultValue: "long",
    children: (
      <SelectItem value="long">
        값, 값, 값, 값, 값, 값, 값, 값, 값, 값, 값, 값, 값, 값
      </SelectItem>
    ),
  },
};

export const DisabledChips: Story = {
  args: {
    render: "chip",
    options: chipOptions,
    defaultValue: chipOptions.map((option) => option.value),
    disabled: true,
  },
};
