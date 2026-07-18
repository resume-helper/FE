import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell } from "@/shared/icons";
import { Badge } from "@/shared/ui/Badge";
import { TextArea, TextAreaContent } from "@/shared/ui/TextArea";

const sample =
  "청춘! 이는 듣기만 하여도 가슴이 설레는 말이다. 청춘! 너의 두 손을 가슴에 대고, 물방아 같은 심장의 고동을 들어 보라.";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    label: "주제",
    placeholder: "메시지를 입력해 주세요.",
    description: "메시지에 마침표를 찍어요.",
    maxLength: 2000,
    status: "normal",
    resize: "normal",
    heading: true,
    requiredBadge: false,
    bottom: true,
    overflow: true,
    disabled: false,
  },
  argTypes: {
    status: { control: "inline-radio", options: ["normal", "negative"] },
    resize: {
      control: "inline-radio",
      options: ["normal", "limit", "fixed"],
    },
    heading: { control: "boolean" },
    requiredBadge: { control: "boolean" },
    bottom: { control: "boolean" },
    overflow: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: sample },
};

export const Focused: Story = {
  args: { defaultValue: sample, autoFocus: true },
};

export const Negative: Story = {
  args: {
    status: "negative",
    defaultValue: sample,
    description: "메시지에 마침표를 찍어요.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: sample },
};

export const Required: Story = {
  args: { requiredBadge: true },
};

export const WithoutHeading: Story = {
  args: { heading: false },
};

export const WithoutDescription: Story = {
  args: { description: undefined },
};

export const WithoutBottom: Story = {
  args: { bottom: false },
};

export const NormalResize: Story = {
  args: {
    resize: "normal",
    minRows: 3,
    defaultValue: sample.repeat(3),
  },
};

export const LimitResize: Story = {
  args: {
    resize: "limit",
    minRows: 3,
    maxRows: 5,
    defaultValue: Array.from(
      { length: 12 },
      (_, index) => `${index + 1}. ${sample}`
    ).join("\n"),
  },
};

export const FixedResize: Story = {
  args: {
    resize: "fixed",
    rows: 3,
    defaultValue: sample.repeat(3),
  },
};

export const ResizeModes: Story = {
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="grid grid-cols-3 gap-6">
      <TextArea {...args} resize="normal" defaultValue={sample.repeat(2)} />
      <TextArea
        {...args}
        resize="limit"
        minRows={3}
        maxRows={5}
        defaultValue={sample.repeat(4)}
      />
      <TextArea {...args} resize="fixed" rows={3} defaultValue={sample} />
    </div>
  ),
};

export const InternalScroll: Story = {
  args: {
    resize: "limit",
    minRows: 3,
    maxRows: 5,
    defaultValue: Array.from(
      { length: 12 },
      (_, index) => `${index + 1}. ${sample}`
    ).join("\n"),
  },
};

export const ContentSlots: Story = {
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="grid grid-cols-3 gap-6">
      <TextArea {...args} defaultValue={sample} />
      <TextArea
        {...args}
        defaultValue={sample}
        leadingContent={
          <TextAreaContent variant="textButton">텍스트</TextAreaContent>
        }
      />
      <TextArea
        {...args}
        defaultValue={sample}
        trailingContent={
          <TextAreaContent variant="icon">
            <Bell />
          </TextAreaContent>
        }
      />
      <TextArea
        {...args}
        defaultValue={sample}
        trailingContent={
          <TextAreaContent variant="textButton">텍스트</TextAreaContent>
        }
      />
      <TextArea
        {...args}
        defaultValue={sample}
        trailingContent={<Badge text="Badge" size="xsmall" />}
      />
    </div>
  ),
};

export const CharacterCounterOverflow: Story = {
  args: {
    maxLength: 80,
    overflow: true,
    defaultValue: `${sample.slice(0, 80)}!`,
  },
};

export const CharacterCounterLimited: Story = {
  args: {
    maxLength: 80,
    overflow: false,
    defaultValue: sample.slice(0, 80),
  },
};
