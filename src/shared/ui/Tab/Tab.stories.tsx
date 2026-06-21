import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tab, TabList, TabListItem, TabPanel } from "@/shared/ui/Tab";

const meta = {
  title: "UI/Tab",
  component: Tab,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Tab defaultValue="overview" className="w-96">
      <TabList resize="fill">
        <TabListItem value="overview">개요</TabListItem>
        <TabListItem value="activity">활동</TabListItem>
        <TabListItem value="settings">설정</TabListItem>
      </TabList>
      <TabPanel value="overview" className="p-4">
        개요 콘텐츠
      </TabPanel>
      <TabPanel value="activity" className="p-4">
        활동 콘텐츠
      </TabPanel>
      <TabPanel value="settings" className="p-4">
        설정 콘텐츠
      </TabPanel>
    </Tab>
  ),
};
