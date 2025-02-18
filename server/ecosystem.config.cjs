module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.ts",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
      interpreter: "node",
    },
  ],
};
