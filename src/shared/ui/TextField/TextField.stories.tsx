import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField, TextFieldContent } from "@/shared/ui/TextField";
import { Bell } from "@/shared/icons";

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "주제",
    placeholder: "텍스트를 입력해 주세요.",
    description: "메시지에 마침표를 찍어요.",
    status: "default",
    required: false,
    disabled: false,
    clearable: true,
  },
  argTypes: {
    status: { control: "inline-radio", options: ["default", "invalid"] },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: "값" },
};

export const Negative: Story = {
  args: {
    status: "invalid",
    defaultValue: "값",
    description: "에러 메시지를 나타내요.",
  },
};

export const Required: Story = {
  args: { required: true },
};

export const WithoutDescription: Story = {
  args: { description: undefined },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "값" },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingContent: (
      <TextFieldContent variant="icon">
        <Bell />
      </TextFieldContent>
    ),
  },
};

export const WithTrailingContent: Story = {
  args: {
    defaultValue: "값",
    trailingContent: (
      <TextFieldContent variant="icon">
        <Bell />
      </TextFieldContent>
    ),
  },
};

export const TrailingButtonNormal: Story = {
  args: {
    trailingButton: (
      <TextFieldContent variant="trailingButtonNormal">텍스트</TextFieldContent>
    ),
  },
};

export const TrailingButtonAssistive: Story = {
  args: {
    trailingButton: (
      <TextFieldContent variant="trailingButtonAssistive">
        확인
      </TextFieldContent>
    ),
  },
};

export const TrailingButtonDisabled: Story = {
  args: {
    trailingButtonDisabled: true,
    trailingButton: (
      <TextFieldContent variant="trailingButtonNormal">텍스트</TextFieldContent>
    ),
  },
};

export const Statuses: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <TextField
        {...args}
        status="default"
        description="메시지에 마침표를 찍어요."
      />
      <TextField
        {...args}
        status="invalid"
        defaultValue="값"
        description="에러 메시지를 나타내요."
      />
      <TextField {...args} disabled defaultValue="값" />
    </div>
  ),
};
