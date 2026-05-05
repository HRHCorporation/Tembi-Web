import { DBConfig } from "@/shared/infrastructure/database/types";

const envs = process.env;
export const dbConfigs: DBConfig = {
  host: envs.DB_HOST!,
  port: Number(envs.DB_PORT),
  user: envs.DB_USER!,
  password: envs.DB_PASSWORD!,
  database: envs.DB_NAME!,
}