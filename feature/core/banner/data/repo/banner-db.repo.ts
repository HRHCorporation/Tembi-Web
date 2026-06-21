import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither"; import Banner from "../../domain/entity/banner.entity";
import BannerRepo from "../../domain/i-repo/banner.i-repo";
import { ApiResponse } from "@/types/api-response.types";
import { BannerResponse } from '../../domain/response/banner-response';
import BannerEndpoint from "@/bootstrap/endpoint/endpoints/banner-endpoints";
import FetchHandler from "@/feature/common/data/fetch-handler";
import ApiTask from "@/feature/common/data/api-task";
import { pipe } from "fp-ts/lib/function";
import { BannerFetchFailure, BannerParseFailure } from "../../domain/failure/banner.failure";

export default class BannerDbRepo implements BannerRepo {
  private endpoint: BannerEndpoint;
  private fetchHandler: FetchHandler;

  constructor() {
    this.endpoint = new BannerEndpoint();
    this.fetchHandler = new FetchHandler();

  }

  fetchVenueBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.venue, "venue");
  }

  fetchHistoryBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.history, "history");
  }

  fetchFoodBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.food, "food");
  }

  fetchCollectionBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.collection, "collection");
  }

  fetchRoomBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.room, "room");
  }

  fetchEventBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.event, "event");
  }

  fetchBlogBanners(): ApiTask<Banner[]> {
    return this.fetchBanners(this.endpoint.blog, "blog");
  }

  private fetchBanners(endpoint: string, type: string): ApiTask<Banner[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint,
        method: "GET",
      }),

      mapLeft((error) => new BannerFetchFailure(type, endpoint, error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<BannerResponse[]>>,
          () => new BannerParseFailure(type, "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data)
          : TE.left(
            new BannerParseFailure(type, "Expected array but got different type")
          )
      ),
      map((apiData) => this.bannersDto(apiData))
    );
  }


  private bannersDto(apiResponse: BannerResponse[]): Banner[] {
    return apiResponse.map((apiBanner) => this.bannerDto(apiBanner));
  }

  private bannerDto(apiResponse: BannerResponse): Banner {
    return new Banner({
      id: apiResponse.id,
      image: apiResponse.image,
      title_ind: apiResponse.title_ind,
      title_eng: apiResponse.title_eng,
      subtitle_ind: apiResponse.subtitle_ind,
      subtitle_eng: apiResponse.subtitle_eng,
      description_ind: apiResponse.description_ind,
      description_eng: apiResponse.description_eng,
    });
  }
}