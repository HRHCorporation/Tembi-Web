import ApiTask from "@/feature/common/data/api-task";
import RoomSlug from "../entity/room-slug.entity";
import HouseRepo, { houseRepoKey } from "../i-repo/house.i-repo";
import { houseModuleKey } from "../../house.module-key";
import { diResolve } from "@/feature/common/features.di";
import RoomRecommendation from "../entity/room-recomendation.entity";

export default function fetchRoomRecommendationUsecase(): ApiTask<RoomRecommendation[]> {
  const repo = diResolve<HouseRepo>(houseModuleKey, houseRepoKey);
  return repo.fetchRoomRecomendation();
}