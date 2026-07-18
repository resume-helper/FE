import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Pagination,
  PaginationField,
  PaginationSelect,
} from "@/shared/ui/Pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  args: { totalPages: 20, defaultPage: 5, variant: "extended" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["extended", "compact", "minimize"],
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithControls: Story = {
  render: (args) => (
    <Pagination
      {...args}
      leadingContent={<PaginationSelect />}
      trailingContent={<PaginationField totalPages={20} />}
    />
  ),
};
