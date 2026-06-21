import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "@/shared/ui/Skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  args: { className: "h-5 w-64" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Card: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  ),
};
