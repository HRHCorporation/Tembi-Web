import { DependencyContainer } from "tsyringe";
import { foodRepoKey } from "../../domain/i-repo/food.i-repo";
import FoodDbRepo from "../repo/food-db.repo";

export default function getFoodDi(di: DependencyContainer) {
  di.register(foodRepoKey, FoodDbRepo);
  return di;
}