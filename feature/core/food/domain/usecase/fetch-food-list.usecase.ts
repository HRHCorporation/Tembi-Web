import ApiTask from "@/feature/common/data/api-task";
import FoodList from "../entity/food-list.entity";
import { diResolve } from "@/feature/common/features.di";
import FoodRepo, { foodRepoKey } from "../i-repo/food.i-repo";
import { foodModuleKey } from "../../food.module-key";

export default function fetchFoodListUsecase(): ApiTask<FoodList[]> {
  const repo = diResolve<FoodRepo>(foodModuleKey, foodRepoKey);
  return repo.fetchFoodList();
}