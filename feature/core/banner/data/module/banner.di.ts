import { DependencyContainer } from "tsyringe";
import { bannerRepoKey } from "../../domain/i-repo/banner.i-repo";
import BannerDbRepo from "../repo/banner-db.repo";

export default function getBannerDi(di: DependencyContainer) {
  di.register(bannerRepoKey, BannerDbRepo);
  return di;
}