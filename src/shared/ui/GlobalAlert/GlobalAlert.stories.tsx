import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlobalAlert } from "@/shared/ui/GlobalAlert";
import { useAlertStore } from "@/shared/store/alertStore";

const meta = {
  title: "UI/GlobalAlert",
  component: GlobalAlert,
  parameters: { layout: "centered" },
} satisfies Meta<typeof GlobalAlert>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <>
      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        onClick={() =>
          void useAlertStore.getState().show({
            title: "삭제할까요?",
            content: "삭제한 데이터는 복구할 수 없습니다.",
            confirm: { label: "삭제", variant: "negative" },
            cancel: { label: "취소" },
          })
        }
      >
        전역 알림 열기
      </button>
      <GlobalAlert />
    </>
  ),
};
