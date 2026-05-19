import ApiTask from '@/feature/common/data/api-task';
import FoodCelebrate from '../entity/food-celebrate.entity';
import FoodRepo, { foodRepoKey } from '../i-repo/food.i-repo';
import { foodModuleKey } from '../../food.module-key';
import { diResolve } from '@/feature/common/features.di';

export default function fetchFoodCelebrateUsecase(): ApiTask<FoodCelebrate[]> {
  const repo = diResolve<FoodRepo>(foodModuleKey, foodRepoKey);
  return repo.fetchCelebrate();
}