import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressIndicator } from "@/shared/ui/ProgressIndicator";

const meta = {
  title: "UI/ProgressIndicator",
  component: ProgressIndicator,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: { percent: 45 },
  argTypes: {
    percent: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
