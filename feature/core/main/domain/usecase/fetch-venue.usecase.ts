import { diResolve } from "@/feature/common/features.di";
import { mainModuleKey } from "../../main.module-key";
import MainRepo, { mainRepoKey } from "../i-repo/main.i-repo";

export default function fetchVenueUsecase() {
  const repo = diResolve<MainRepo>(mainModuleKey, mainRepoKey);
  return repo.fetchVenues();
}