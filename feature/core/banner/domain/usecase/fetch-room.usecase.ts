import ApiTask from "@/feature/common/data/api-task";
import Banner from "../entity/banner.entity";
import { diResolve } from "@/feature/common/features.di";
import BannerRepo, { bannerRepoKey } from "../i-repo/banner.i-repo";
import { bannerModuleKey } from "../../banner.module-key";

export default function fetchRoomBannersUsecase(): ApiTask<Banner[]> {
  const repo = diResolve<BannerRepo>(bannerModuleKey, bannerRepoKey);
  return repo.fetchRoomBanners();
}