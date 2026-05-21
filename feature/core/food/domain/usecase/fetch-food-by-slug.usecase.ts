import ApiTask from "@/feature/common/data/api-task";
import FoodSlug from "../entity/food-slug.entity";
import FoodRepo, { foodRepoKey } from "../i-repo/food.i-repo";
import { foodModuleKey } from "../../food.module-key";
import { diResolve } from "@/feature/common/features.di";

export default function fetchFoodBySlugUsecase(slug: string): ApiTask<FoodSlug> {
  const repo = diResolve<FoodRepo>(foodModuleKey, foodRepoKey);
  return repo.fetchFoodBySlug(slug);
}