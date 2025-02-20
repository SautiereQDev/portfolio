module.exports = {
  apps: [
    {
      name: "portfolio-mail-service",
      script: "./server.ts",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
      interpreter: "bun",
    },
  ],
};
