import ApiTask from "@/feature/common/data/api-task";
import Carousel from "../../domain/entity/carousel.entity";
import Collection from "../../domain/entity/collection.entity";
import House from "../../domain/entity/house.entity";
import Venue from "../../domain/entity/venue.entity";
import MainRepo from "../../domain/i-repo/main.i-repo";
import MainEndpoint from "@/bootstrap/endpoint/endpoints/main-endpoints";
import FetchHandler from "@/feature/common/data/fetch-handler";
import { pipe } from "fp-ts/lib/function";
import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { MainFetchFailure } from "../../domain/failure/main-failure";
import { ApiResponse } from "@/types/api-response.types";


export default class MainDbRepo implements MainRepo {
  private endpoint: MainEndpoint;
  private fetchHandler: FetchHandler;

  constructor() {
    this.endpoint = new MainEndpoint();
    this.fetchHandler = new FetchHandler();
  }

  fetchCollections(): ApiTask<Collection[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.collection,
        method: "GET",
      }),
      mapLeft((error) => new MainFetchFailure("collections", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<Collection[]>>,
          () => new MainFetchFailure("collections", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => new Collection(item)))
          : TE.left(new MainFetchFailure("collections", "Parsed data is not an array"))
      ),
      map((collectionList) => collectionList.map((collection) => new Collection(collection)))
    );
  }

  fetchVenues(): ApiTask<Venue[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.venue,
        method: "GET",
      }),
      mapLeft((error) => new MainFetchFailure("venues", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<Venue[]>>,
          () => new MainFetchFailure("venues", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => new Venue(item)))
          : TE.left(new MainFetchFailure("venues", "Parsed data is not an array"))
      ),
      map((venueList) => venueList.map((venue) => new Venue(venue)))
    );
  }

  fetchHouses(): ApiTask<House[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.house,
        method: "GET",
      }),
      mapLeft((error) => new MainFetchFailure("houses", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<House[]>>,
          () => new MainFetchFailure("houses", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => new House(item)))
          : TE.left(new MainFetchFailure("houses", "Parsed data is not an array"))
      ),
      map((houseList) => houseList.map((house) => new House(house)))
    );
  }

  fetchCarousels(): ApiTask<Carousel[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.carousel,
        method: "GET",
      }),
      mapLeft((error) => new MainFetchFailure("carousels", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<Carousel[]>>,
          () => new MainFetchFailure("carousels", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => new Carousel(item)))
          : TE.left(new MainFetchFailure("carousels", "Parsed data is not an array"))
      ),
      map((carouselList) => carouselList.map((carousel) => new Carousel(carousel)))
    );
  }
}