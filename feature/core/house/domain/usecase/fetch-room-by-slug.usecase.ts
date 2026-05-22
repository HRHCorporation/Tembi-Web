import ApiTask from "@/feature/common/data/api-task";
import RoomSlug from "../entity/room-slug.entity";
import { diResolve } from "@/feature/common/features.di";
import HouseRepo, { houseRepoKey } from "../i-repo/house.i-repo";
import { houseModuleKey } from "../../house.module-key";

export default function fetchRoomBySlugUsecase(slug: string): ApiTask<RoomSlug> {
  const repo = diResolve<HouseRepo>(houseModuleKey, houseRepoKey);
  return repo.fetchRoomBySlug(slug);
}