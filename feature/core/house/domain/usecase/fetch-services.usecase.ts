import { diResolve } from "@/feature/common/features.di";
import HouseRepo, { houseRepoKey } from "../i-repo/house.i-repo";
import { houseModuleKey } from "../../house.module-key";

export default function fetchServicesUsecase() {
  const repo = diResolve<HouseRepo>(houseModuleKey, houseRepoKey);
  return repo.fetchServices();
}