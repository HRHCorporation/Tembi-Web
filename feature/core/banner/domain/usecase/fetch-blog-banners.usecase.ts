import { diResolve } from "@/feature/common/features.di";
import Banner from "../entity/banner.entity";
import BannerRepo, { bannerRepoKey } from "../i-repo/banner.i-repo";
import { bannerModuleKey } from "../../banner.module-key";
import ApiTask from "@/feature/common/data/api-task";

export default function fetchBlogBannersUsecase(): ApiTask<Banner[]> {
  const repo = diResolve<BannerRepo>(bannerModuleKey, bannerRepoKey);
  return repo.fetchBlogBanners();
}
