import { diResolve } from "@/feature/common/features.di";
import HouseRepo, { houseRepoKey } from "../i-repo/house.i-repo";
import { houseModuleKey } from "../../house.module-key";

export default function fetchServicesAddUsecase() {
  const repo = diResolve<HouseRepo>(houseModuleKey, houseRepoKey);
  return repo.fetchServicesAdd();
}