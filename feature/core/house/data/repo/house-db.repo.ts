import HouseEndpoint from "@/bootstrap/endpoint/endpoints/house-endpoints";
import HouseRepo from "../../domain/i-repo/house.i-repo";
import FetchHandler from "@/feature/common/data/fetch-handler";
import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { FoodFetchFailure, FoodParseFailure } from "@/feature/core/food/domain/failure/food-failure";
import { pipe } from "fp-ts/lib/function";
import ServicesAdd from "../../domain/entity/services-add.entity";
import ApiTask from "@/feature/common/data/api-task";
import RoomList from "../../domain/entity/room-list.entity";
import RoomRecommendation from "../../domain/entity/room-recomendation.entity";
import RoomSlug from "../../domain/entity/room-slug.entity";
import Services from "../../domain/entity/services.entity";
import { ApiResponse } from "@/types/api-response.types";

export default class HouseDbRepo implements HouseRepo {
  private endpoint: HouseEndpoint;
  private fetchHanlder: FetchHandler;

  constructor() {
    this.endpoint = new HouseEndpoint();
    this.fetchHanlder = new FetchHandler();
  }
  fetchServices(): ApiTask<Services[]> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.service,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("services", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<Services[]>>,
          () => new FoodParseFailure("services", "Failed to parse JSON response for services")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => Services.fromResponse(item)))
          : TE.left(new FoodParseFailure("services", "Expected array but got different type for services"))
      ),
      map((services) => services.map((service) => new Services(service)))
    );
  }

  fetchRoomList(): ApiTask<RoomList[]> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.rooms,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("room list", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<RoomList[]>>,
          () => new FoodParseFailure("room list", "Failed to parse JSON response for room list")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => RoomList.fromResponse(item)))
          : TE.left(new FoodParseFailure("room list", "Expected array but got different type for room list"))
      ),
      map((roomLists) => roomLists.map((roomList) => new RoomList(roomList)))
    );
  }

  fetchRoomRecomendation(): ApiTask<RoomRecommendation[]> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.recommendation,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("room recommendation", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<RoomRecommendation[]>>,
          () => new FoodParseFailure("room recommendation", "Failed to parse JSON response for room recommendation")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => RoomRecommendation.fromResponse(item)))
          : TE.left(new FoodParseFailure("room recommendation", "Expected array but got different type for room recommendation"))
      ),
      map((roomRecommendations) => roomRecommendations.map((roomRecommendation) => new RoomRecommendation(roomRecommendation)))
    );
  }

  fetchRoomBySlug(slug: string): ApiTask<RoomSlug> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.roomBySlug(slug),
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("room by slug", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<RoomSlug>>,
          () => new FoodParseFailure("room by slug", "Failed to parse JSON response for room by slug")
        )
      ),
      map((result) => new RoomSlug(RoomSlug.fromResponse(result.data)))
    );
  }

  fetchServicesAdd(): ApiTask<ServicesAdd[]> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.addService,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("services add", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<ServicesAdd[]>>,
          () => new FoodFetchFailure("services add", "Failed to parse JSON response for services add")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => ServicesAdd.fromResponse(item)))
          : TE.left(new FoodParseFailure("services add", "Expected array but got different type for services add"))
      ),
      map((servicesAdd) => servicesAdd.map((serviceAdd) => new ServicesAdd(serviceAdd)))
    );
  }
}
