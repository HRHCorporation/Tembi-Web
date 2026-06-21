import ApiTask from "@/feature/common/data/api-task";
import Banner from "../entity/banner.entity";

export default interface BannerRepo {
  fetchVenueBanners(): ApiTask<Banner[]>;
  fetchHistoryBanners(): ApiTask<Banner[]>;
  fetchFoodBanners(): ApiTask<Banner[]>;
  fetchCollectionBanners(): ApiTask<Banner[]>;
  fetchRoomBanners(): ApiTask<Banner[]>;
  fetchEventBanners(): ApiTask<Banner[]>;
  fetchBlogBanners(): ApiTask<Banner[]>;
}

export const bannerRepoKey = 'bannerRepoKey';