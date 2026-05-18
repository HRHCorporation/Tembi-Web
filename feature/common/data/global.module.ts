import AuthSanctumRepo from "@/feature/generic/auth/data/repo/auth.repository";
import { authRepoKey } from "@/feature/generic/auth/domain/i-repo/auth.repository";
import { DependencyContainer } from "tsyringe";
import FetchHandler from "./fetch-handler";


export default function globalModule(di: DependencyContainer) {
  const globalDi = di.createChildContainer();

  globalDi.register(authRepoKey, AuthSanctumRepo);
  globalDi.register(FetchHandler, FetchHandler);
  return globalDi;
}