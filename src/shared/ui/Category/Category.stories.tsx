import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Category,
  CategoryList,
  CategoryListItem,
  CategoryPanel,
} from "@/shared/ui/Category";

const meta = {
  title: "UI/Category",
  component: Category,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Category defaultValue="all" className="w-96">
      <CategoryList>
        <CategoryListItem value="all">전체</CategoryListItem>
        <CategoryListItem value="design">디자인</CategoryListItem>
        <CategoryListItem value="development">개발</CategoryListItem>
      </CategoryList>
      <CategoryPanel value="all" className="p-4">
        전체 콘텐츠
      </CategoryPanel>
      <CategoryPanel value="design" className="p-4">
        디자인 콘텐츠
      </CategoryPanel>
      <CategoryPanel value="development" className="p-4">
        개발 콘텐츠
      </CategoryPanel>
    </Category>
  ),
};
