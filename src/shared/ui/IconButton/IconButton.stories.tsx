import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "@/shared/ui/IconButton";
import { Bell, Plus, Setting, Trash } from "@/shared/icons";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "normal",
    size: "medium",
    alternative: false,
    disabled: false,
    label: "알림",
    children: <Bell />,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["normal", "background", "outlined", "solid"],
    },
    size: {
      control: "inline-radio",
      options: ["medium", "small"],
      description: "normal/background는 항상 medium으로 고정됩니다.",
    },
    alternative: {
      control: "boolean",
      description: "background variant에서 어두운 배경용 색상으로 전환합니다.",
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined", label: "추가", children: <Plus /> },
};

export const Solid: Story = {
  args: { variant: "solid", label: "추가", children: <Plus /> },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} variant="outlined" size="small" label="작게">
        <Setting />
      </IconButton>
      <IconButton {...args} variant="outlined" size="medium" label="크게">
        <Setting />
      </IconButton>
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} variant="normal" label="알림">
        <Bell />
      </IconButton>
      <IconButton {...args} variant="outlined" label="설정">
        <Setting />
      </IconButton>
      <IconButton {...args} variant="solid" label="추가">
        <Plus />
      </IconButton>
      <IconButton {...args} variant="normal" label="삭제">
        <Trash />
      </IconButton>
    </div>
  ),
};
