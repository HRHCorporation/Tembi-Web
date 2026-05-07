import "server-only";

import { diResolve } from "@/feature/common/features.di";

import AuthRepo, {
  authRepoKey,
} from "../../domain/i-repo/auth.repository";

import { authModuleKey } from "../../auth-module-key";

export default function loginUsecase(
  email: string,
  password: string,
) {
  const repo = diResolve<AuthRepo>(
    authModuleKey,
    authRepoKey,
  );

  return repo.login(email, password);
}