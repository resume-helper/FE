import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "@/shared/ui/Switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  args: {
    checked: false,
    size: "medium",
    platform: "normal",
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "inline-radio", options: ["small", "medium"] },
    platform: { control: "inline-radio", options: ["normal", "ios"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);

    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Platform: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex items-center gap-4">
        <Switch
          {...args}
          platform="normal"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Switch {...args} platform="ios" defaultChecked />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [smallChecked, setSmallChecked] = React.useState(false);
    const [mediumChecked, setMediumChecked] = React.useState(true);

    return (
      <div className="flex items-center gap-4">
        <Switch
          {...args}
          size="small"
          checked={smallChecked}
          onCheckedChange={setSmallChecked}
        />
        <Switch
          {...args}
          size="medium"
          checked={mediumChecked}
          onCheckedChange={setMediumChecked}
        />
      </div>
    );
  },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(true);

    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Switch
      {...args}
      disabled
      defaultChecked={true}
      onCheckedChange={() => {}}
    />
  ),
};
