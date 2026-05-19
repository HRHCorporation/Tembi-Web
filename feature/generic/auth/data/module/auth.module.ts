import 'server-only';
import { authRepoKey } from "@/feature/generic/auth/domain/i-repo/auth.repository";
import { DependencyContainer } from "tsyringe";
import AuthSanctumRepo from "../repo/auth.repository";

export default function authModule(di: DependencyContainer) {
  di.register(authRepoKey, AuthSanctumRepo);
  return di;
}