import { mainModuleKey } from "../../main.module-key";
import { diResolve } from "@/feature/common/features.di";
import MainRepo, { mainRepoKey } from "../i-repo/main.i-repo";

export default function fetchCarouselUsecase() {
  const repo = diResolve<MainRepo>(mainModuleKey, mainRepoKey);
  return repo.fetchCarousels();
}