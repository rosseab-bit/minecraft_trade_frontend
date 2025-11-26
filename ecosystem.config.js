module.exports = {
  apps: [
    {
      name: "next-app-minecraft",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3005",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      autorestart: true,
      max_memory_restart: "100M",
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};
