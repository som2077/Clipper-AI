const path = require("path");

module.exports = {
  apps: [
    {
      name: "clipper-ai-backend",
      cwd: path.join(__dirname, "backend"),
      script: path.join(__dirname, "backend/.venv/bin/uvicorn"),
      args: "src.main:app --host 0.0.0.0 --port 8000",
      interpreter: "none",
      env: {
        DATABASE_URL:
          "postgresql+asyncpg://supoclip:supoclip_password@localhost:5432/supoclip",
        REDIS_HOST: "localhost",
        REDIS_PORT: "6379",
        SELF_HOST: "true",
        FRONTEND_PORT: "3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        CORS_ORIGINS:
          "http://localhost:3107,http://localhost:3000,http://localhost:8000",
        BETTER_AUTH_SECRET: "clipper_dev_secret_change_in_production",
        BACKEND_AUTH_SECRET: "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY: "change_me_settings_encryption_secret",
        TRANSCRIPTION_PROVIDER: "assemblyai",
        ASSEMBLY_AI_API_KEY: "9b763661cd3c452dadbde28ebfbbb565",
        WHISPER_MODEL_SIZE: "base",
        LLM: "openai:gpt-4o",
        OPENAI_API_KEY:
          "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",
        MEDIA_STORAGE: "local",
      },
    },
    {
      name: "clipper-ai-worker",
      cwd: path.join(__dirname, "backend"),
      script: path.join(__dirname, "backend/.venv/bin/python"),
      args: "-m src.workers.run_workers",
      interpreter: "none",
      env: {
        DATABASE_URL:
          "postgresql+asyncpg://supoclip:supoclip_password@localhost:5432/supoclip",
        REDIS_HOST: "localhost",
        REDIS_PORT: "6379",
        SELF_HOST: "true",
        FRONTEND_PORT: "3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        BETTER_AUTH_SECRET: "clipper_dev_secret_change_in_production",
        BACKEND_AUTH_SECRET: "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY: "change_me_settings_encryption_secret",
        TRANSCRIPTION_PROVIDER: "assemblyai",
        ASSEMBLY_AI_API_KEY: "9b763661cd3c452dadbde28ebfbbb565",
        WHISPER_MODEL_SIZE: "base",
        LLM: "openai:gpt-4o",
        OPENAI_API_KEY:
          "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",
        MEDIA_STORAGE: "local",
      },
    },
    {
      name: "clipper-ai-frontend",
      cwd: path.join(__dirname, "frontend"),
      script: "pnpm",
      args: "run dev",
      interpreter: "none",
      env: {
        PORT: "3107",
        DATABASE_URL:
          "postgresql://supoclip:supoclip_password@localhost:5432/supoclip",
        BETTER_AUTH_SECRET: "clipper_dev_secret_change_in_production",
        BETTER_AUTH_URL: "http://localhost:3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        NEXT_PUBLIC_API_URL: "http://localhost:8000",
        BACKEND_INTERNAL_URL: "http://localhost:8000",
        NEXT_PUBLIC_SELF_HOST: "true",
        SELF_HOST: "true",
        BACKEND_AUTH_SECRET: "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY: "change_me_settings_encryption_secret",
      },
    },
  ],
};
