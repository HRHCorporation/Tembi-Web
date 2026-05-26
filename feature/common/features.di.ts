import { DependencyContainer, InjectionToken } from "tsyringe";
import { bannerModuleKey } from "../core/banner/banner.module-key";
import globalModule from "./data/global.module";
import getBannerDi from "../core/banner/data/module/banner.di";
import di from "@/bootstrap/di/init-di";
import { foodModuleKey } from "../core/food/food.module-key";
import getFoodDi from "../core/food/data/module/food.di";
import { collectionModuleKey } from "../core/collection/collection.module-key";
import getCollectionDi from "../core/collection/data/module/collection.di";
import { houseModuleKey } from "../core/house/house.module-key";
import getHouseDi from "../core/house/data/module/house.di";
import { mainModuleKey } from "../core/main/main.module-key";
import getMainDi from "../core/main/data/module/main.di";
import { venueModuleKey } from "../core/venue/venue.module-key";
import getVenueDi from "../core/venue/data/module/venue.di";

const moduleKeyToDi: Record<string, (di: DependencyContainer) => DependencyContainer> = {
  [bannerModuleKey]: getBannerDi,
  [collectionModuleKey]: getCollectionDi,
  [foodModuleKey]: getFoodDi,
  [houseModuleKey]: getHouseDi,
  [mainModuleKey]: getMainDi,
  [venueModuleKey]: getVenueDi
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