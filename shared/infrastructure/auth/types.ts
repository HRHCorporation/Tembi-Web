import { UserConfig } from "../user/types";

export interface AuthConfig {
  userModel: UserConfig;
  token: string;
}