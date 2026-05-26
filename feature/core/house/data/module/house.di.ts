import { DependencyContainer } from "tsyringe";
import { houseRepoKey } from "../../domain/i-repo/house.i-repo";
import HouseDbRepo from "../repo/house-db.repo";

export default function getHouseDi(di: DependencyContainer) {
  di.register(houseRepoKey, HouseDbRepo);
  return di;
}