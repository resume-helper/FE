module.exports = {
  apps: [
    {
      name: "resume-helper",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/ubuntu/app",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
