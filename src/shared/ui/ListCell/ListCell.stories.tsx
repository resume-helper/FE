import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell } from "@/shared/icons";
import { List, ListCell, ListCellContent } from "@/shared/ui/ListCell";

const meta = {
  title: "UI/ListCell",
  component: ListCell,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ListCell>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <List className="w-80">
      <ListCell
        leadingContent={<Bell />}
        trailingContent={<ListCellContent variant="chevron" />}
        textProps={{ caption: "보조 설명" }}
        divider
      >
        목록 항목
      </ListCell>
      <ListCell selected>선택된 항목</ListCell>
      <ListCell disabled>비활성 항목</ListCell>
    </List>
  ),
};
