import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Toast } from "@/shared/ui/Toast";

const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        <button
          className="rounded-lg border px-3 py-2"
          onClick={() => toast.success("저장했습니다.")}
        >
          성공
        </button>
        <button
          className="rounded-lg border px-3 py-2"
          onClick={() => toast.warning("확인이 필요합니다.")}
        >
          경고
        </button>
        <button
          className="rounded-lg border px-3 py-2"
          onClick={() => toast.error("처리하지 못했습니다.")}
        >
          오류
        </button>
      </div>
      <Toast />
    </>
  ),
};
