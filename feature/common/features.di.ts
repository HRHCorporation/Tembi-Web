import { DependencyContainer } from "tsyringe";
import { iHomeRepoKey } from "../core/homes/domain/i-repo/home.i-repo";

const moduleKeyToDi: Record<string, (di: DependencyContainer) => DependencyContainer> = {
  // [iHomeRepoKey]: getHomeRepoDi,
}

const memoizedDis: Record<string, DependencyContainer> = {};

export default function featuresDi(module: string): DependencyContainer {
  if (memoizedDis[module]) return memoizedDis[module];
  const moduleDiHandler = moduleKeyToDi[module];
  if (!moduleDiHandler)
    throw new Error(`Server Di didn't found for module: ${module}`);

  const moduleDi = moduleDiHandler(di.createChildContainer());
  globalModule(moduleDi);
  memoizedDis[module] = moduleDi;
  return moduleDi;
}

export function diResolve<T = unknown>(module: string, key: InjectionToken): T {
  return featuresDi(module).resolve<T>(key);
}