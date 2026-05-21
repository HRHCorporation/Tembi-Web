import ApiTask from "@/feature/common/data/api-task";
import FoodList from "../entity/food-list.entity";
import FoodHighlight from "../entity/food-highlight.entity";
import FoodSlug from "../entity/food-slug.entity";
import FoodCelebrate from "../entity/food-celebrate.entity";

export default interface FoodRepo {
  fetchFoodList(): ApiTask<FoodList[]>;
  fetchFoodHighlight(): ApiTask<FoodHighlight[]>;
  fetchFoodBySlug(slug: string): ApiTask<FoodSlug>;
  fetchCelebrate(): ApiTask<FoodCelebrate[]>;
}

export const foodRepoKey = 'foodRepoKey';