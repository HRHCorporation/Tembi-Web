import "server-only";
import ApiTask from "@/feature/common/data/api-task";
import { diResolve } from "@/feature/common/features.di";

import AuthRepo, {
  authRepoKey,
} from "@/feature/generic/auth/domain/i-repo/auth.repository";
import { AuthProfileParams } from "../entity/auth-profile.entity";
import { authModuleKey } from "../../auth-module-key";

export default function getCachedProfile(): ApiTask<AuthProfileParams> {
  const repo = diResolve<AuthRepo>(authModuleKey, authRepoKey);
  return repo.getCachedProfile();
}