import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckboxGroup, CheckboxGroupItem } from "@/shared/ui/CheckboxGroup";

const meta = {
  title: "UI/CheckboxGroup",
  component: CheckboxGroup,
  parameters: { layout: "centered" },
  args: {
    defaultValue: ["design"],
    orientation: "vertical",
    variant: "checkbox",
    disabled: false,
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "inline-radio",
      options: ["checkbox", "checkmark"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <CheckboxGroupItem value="design" label="디자인" />
      <CheckboxGroupItem value="frontend" label="프론트엔드" />
      <CheckboxGroupItem value="backend" label="백엔드" />
    </CheckboxGroup>
  ),
};

export const Horizontal: Story = {
  ...Default,
  args: { ...Default.args, orientation: "horizontal" },
};

export const SizesAndAlignment: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <CheckboxGroup defaultValue={["small"]}>
        <CheckboxGroupItem value="small" label="Small" size="small" />
      </CheckboxGroup>
      <CheckboxGroup defaultValue={["medium"]}>
        <CheckboxGroupItem value="medium" label="Medium" size="medium" right />
      </CheckboxGroup>
    </div>
  ),
};

export const Disabled: Story = {
  ...Default,
  args: { ...Default.args, disabled: true },
};

export const CheckmarkVariant: Story = {
  args: { variant: "checkmark" },
  render: (args) => (
    <CheckboxGroup {...args}>
      <CheckboxGroupItem value="design" label="디자인" />
      <CheckboxGroupItem value="frontend" label="프론트엔드" />
      <CheckboxGroupItem value="backend" label="백엔드" />
    </CheckboxGroup>
  ),
};
