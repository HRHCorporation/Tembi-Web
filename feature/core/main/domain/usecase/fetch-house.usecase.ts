import { diResolve } from "@/feature/common/features.di";
import MainRepo from "../i-repo/main.i-repo";
import { mainModuleKey } from '../../main.module-key';

export default function fetchHouseUsecase() {
  const repo = diResolve<MainRepo>(mainModuleKey, mainModuleKey);
  return repo.fetchHouses();
}