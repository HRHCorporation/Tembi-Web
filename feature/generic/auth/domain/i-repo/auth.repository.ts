import ApiTask from "@/feature/common/data/api-task";

import AuthToken from "@/feature/generic/auth/domain/entity/auth-token.entity";
import AuthProfile from "../entity/auth-profile.entity";
import LoginResponse from "@/shared/infrastructure/response/login-response";

export default interface AuthRepo {
  login(
    email: string,
    password: string,
  ): ApiTask<LoginResponse>;

  logout(): ApiTask<boolean>;

  getMe(): ApiTask<AuthProfile>;

  getCachedToken(): ApiTask<AuthToken>;

  getCachedProfile(): ApiTask<AuthProfile>;
}

export const authRepoKey = "authRepoKey";