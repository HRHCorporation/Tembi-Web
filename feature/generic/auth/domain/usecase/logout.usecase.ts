import "server-only";
import { diResolve } from "@/feature/common/features.di";
import AuthRepo, {
  authRepoKey,
} from "@/feature/generic/auth/domain/i-repo/auth.repository";
import { authModuleKey } from "../../auth-module-key";

export default function logoutUsecase() {
  const repo = diResolve<AuthRepo>(authModuleKey, authRepoKey);

  return repo.logout();
}