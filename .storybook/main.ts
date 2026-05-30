import type { StorybookConfig } from "@storybook/nextjs-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(tsconfigPaths());
    return config;
  },
};
export default config;
