export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", Infinity],
    "footer-max-line-length": [2, "always", Infinity],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "style",
        "chore",
        "ci",
        "refactor",
        "revert",
        "test",
        "remove",
        "move",
        "docs",
        "perf",
      ],
    ],
  },
};
