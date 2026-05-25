import { DependencyContainer } from "tsyringe";
import { mainRepoKey } from "../../domain/i-repo/main.i-repo";
import MainDbRepo from "../repo/main-db.repo";

export default function getMainDi(di: DependencyContainer) {
  di.register(mainRepoKey, MainDbRepo);
  return di;
}