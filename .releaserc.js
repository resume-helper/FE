export default {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { scope: "no-release", release: false },
          { scope: "breaking", release: "major" },

          { type: "docs", scope: "README", release: "patch" },

          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },

          { type: "style", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "revert", release: "patch" },

          { type: "refactor", scope: "core-*", release: "minor" },
          { type: "refactor", release: "patch" },

          { type: "move", release: false },
          { type: "remove", release: false },

          { type: "chore", release: false },
          { type: "ci", release: false },
          { type: "test", release: false },
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "✨ Features", hidden: false },
            { type: "fix", section: "🐛 Bug Fixes", hidden: false },
            { type: "perf", section: "🌈 Performance", hidden: false },
            { type: "refactor", section: "♻️ Refactor", hidden: false },
            { type: "docs", section: "📝 Docs", hidden: false },
            { type: "style", section: "💄 Styles", hidden: false },
            { type: "revert", section: "🕐 Reverts", hidden: false },
            { type: "ci", section: "💫 CI/CD", hidden: false },

            { type: "test", section: "✅ Tests", hidden: true },
            { type: "chore", section: "📦 Chores", hidden: true },
            { type: "move", section: "🚚 Move Files", hidden: true },
            { type: "remove", section: "🔥 Remove Files", hidden: true },
          ],
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
        changelogTitle: "# 🚦 CHANGELOG",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
