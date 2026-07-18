import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  args: {
    defaultValue: "design",
    orientation: "vertical",
    disabled: false,
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="design" label="디자인" />
      <RadioGroupItem value="frontend" label="프론트엔드" />
      <RadioGroupItem value="backend" label="백엔드" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  ...Default,
  args: { ...Default.args, orientation: "horizontal" },
};

export const SizesAndAlignment: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <RadioGroup defaultValue="small">
        <RadioGroupItem value="small" label="Small" size="small" />
      </RadioGroup>
      <RadioGroup defaultValue="medium">
        <RadioGroupItem value="medium" label="Medium" size="medium" right />
      </RadioGroup>
    </div>
  ),
};

export const TightAndBold: Story = {
  render: () => (
    <RadioGroup defaultValue="bold">
      <RadioGroupItem value="normal" label="Normal" tight />
      <RadioGroupItem value="bold" label="Bold" tight bold />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  ...Default,
  args: { ...Default.args, disabled: true },
};
