const path = require("path");
try {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch {
  // Ignore missing dotenv module if running standalone
}

module.exports = {
  apps: [
    {
      name: "clipper-ai-backend",
      cwd: path.join(__dirname, "backend"),
      script: "./.venv/bin/uvicorn",
      args: "src.main:app --host 0.0.0.0 --port 8000",
      interpreter: "none",
      env: {
        DATABASE_URL:
          process.env.DATABASE_URL ||
          "postgresql+asyncpg://supoclip:supoclip_password@localhost:5432/supoclip",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        SELF_HOST: "true",
        FRONTEND_PORT: "3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        CORS_ORIGINS:
          "http://localhost:3107,http://localhost:3000,http://localhost:8000",
        BETTER_AUTH_SECRET:
          process.env.BETTER_AUTH_SECRET || "clipper_dev_secret_change_in_production",
        BACKEND_AUTH_SECRET:
          process.env.BACKEND_AUTH_SECRET || "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY:
          process.env.APP_SETTINGS_ENCRYPTION_KEY || "change_me_settings_encryption_secret",
        TRANSCRIPTION_PROVIDER: process.env.TRANSCRIPTION_PROVIDER || "assemblyai",
        ASSEMBLY_AI_API_KEY: process.env.ASSEMBLY_AI_API_KEY || "",
        WHISPER_MODEL_SIZE: process.env.WHISPER_MODEL_SIZE || "base",
        LLM: process.env.LLM || "openai:gpt-4o",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        MEDIA_STORAGE: process.env.MEDIA_STORAGE || "local",
      },
    },
    {
      name: "clipper-ai-worker",
      cwd: path.join(__dirname, "backend"),
      script: "./.venv/bin/python",
      args: "-m src.workers.run_workers",
      interpreter: "none",
      env: {
        DATABASE_URL:
          process.env.DATABASE_URL ||
          "postgresql+asyncpg://supoclip:supoclip_password@localhost:5432/supoclip",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        SELF_HOST: "true",
        FRONTEND_PORT: "3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        BETTER_AUTH_SECRET:
          process.env.BETTER_AUTH_SECRET || "clipper_dev_secret_change_in_production",
        BACKEND_AUTH_SECRET:
          process.env.BACKEND_AUTH_SECRET || "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY:
          process.env.APP_SETTINGS_ENCRYPTION_KEY || "change_me_settings_encryption_secret",
        TRANSCRIPTION_PROVIDER: process.env.TRANSCRIPTION_PROVIDER || "assemblyai",
        ASSEMBLY_AI_API_KEY: process.env.ASSEMBLY_AI_API_KEY || "",
        WHISPER_MODEL_SIZE: process.env.WHISPER_MODEL_SIZE || "base",
        LLM: process.env.LLM || "openai:gpt-4o",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        MEDIA_STORAGE: process.env.MEDIA_STORAGE || "local",
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
          process.env.DATABASE_URL ||
          "postgresql://supoclip:supoclip_password@localhost:5432/supoclip",
        BETTER_AUTH_SECRET:
          process.env.BETTER_AUTH_SECRET || "clipper_dev_secret_change_in_production",
        BETTER_AUTH_URL: "http://localhost:3107",
        NEXT_PUBLIC_APP_URL: "http://localhost:3107",
        NEXT_PUBLIC_API_URL: "http://localhost:8000",
        BACKEND_INTERNAL_URL: "http://localhost:8000",
        NEXT_PUBLIC_SELF_HOST: "true",
        SELF_HOST: "true",
        BACKEND_AUTH_SECRET:
          process.env.BACKEND_AUTH_SECRET || "change_me_backend_auth_secret",
        APP_SETTINGS_ENCRYPTION_KEY:
          process.env.APP_SETTINGS_ENCRYPTION_KEY || "change_me_settings_encryption_secret",
      },
    },
  ],
};
