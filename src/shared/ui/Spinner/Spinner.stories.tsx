import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "@/shared/ui/Spinner";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
