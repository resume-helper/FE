import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuTrigger,
} from "@/shared/ui/Menu";

const meta = {
  title: "UI/Menu",
  component: Menu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Menu defaultValue="profile">
      <MenuTrigger>
        <button className="rounded-lg border px-4 py-2">메뉴 열기</button>
      </MenuTrigger>
      <MenuContent>
        <MenuList>
          <MenuGroup title="계정">
            <MenuItem value="profile">프로필</MenuItem>
            <MenuItem value="settings">설정</MenuItem>
            <MenuItem value="disabled" disabled>
              비활성 항목
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuContent>
    </Menu>
  ),
};
