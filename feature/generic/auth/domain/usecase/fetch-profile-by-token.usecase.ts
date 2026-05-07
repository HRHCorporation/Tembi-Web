import ApiTask from "@/feature/common/data/api-task";
import { diResolve } from "@/feature/common/features.di";
import AuthToken from "@/feature/generic/auth/domain/entity/auth-token.entity";
import AuthRepo, {
  authRepoKey,
} from "@/feature/generic/auth/domain/i-repo/auth.repository";
import AuthProfile from "../entity/auth-profile.entity";
import { authModuleKey } from "../../auth-module-key";

export default function fetchProfileByTokenUsecase(
  token: AuthToken,
): ApiTask<AuthProfile> {
  const repo = diResolve<AuthRepo>(authModuleKey, authRepoKey);
  return repo.fetchProfileByToken(token);
}