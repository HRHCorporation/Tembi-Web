import ApiTask from "@/feature/common/data/api-task";
import FoodHighlight from "../entity/food-highlight.entity";
import { diResolve } from "@/feature/common/features.di";
import FoodRepo, { foodRepoKey } from "../i-repo/food.i-repo";
import { foodModuleKey } from "../../food.module-key";

export default function fetchFoodHighlightUsecase(): ApiTask<FoodHighlight[]> {
  const repo = diResolve<FoodRepo>(foodModuleKey, foodRepoKey);
  return repo.fetchFoodHighlight();
}