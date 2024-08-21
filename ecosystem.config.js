module.exports = {
  apps: [
    {
      name: "reviewit",
      script: "pnpm",
      args: "start",
      interpreter: "pnpm",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
