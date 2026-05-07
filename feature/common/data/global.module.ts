import { DependencyContainer } from "tsyringe";


export default function globalModule(di: DependencyContainer) {
  const globalDi = di.createChildContainer();

  globalDi.register(authRepoKey, AuthIDPRepo);
  globalDi.register(FetchHandler, FetchHandler);
  return globalDi;
}