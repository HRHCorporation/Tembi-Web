import FoodEndpoint from "@/bootstrap/endpoint/endpoints/food-endpoints";
import FoodRepo from "../../domain/i-repo/food.i-repo";
import FetchHandler from "@/feature/common/data/fetch-handler";
import ApiTask from "@/feature/common/data/api-task";
import FoodList from "../../domain/entity/food-list.entity";
import { pipe } from "fp-ts/lib/function";
import { FoodFetchFailure, FoodParseFailure } from "../../domain/failure/food-failure";
import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { ApiResponse } from "@/types/api-response.types";
import { FoodListResponse } from "../../domain/response/food-list-response";
import FoodHighlight from "../../domain/entity/food-highlight.entity";
import { FoodHighlightResponse } from "../../domain/response/food-highlight-response";
import FoodSlug from "../../domain/entity/food-slug.entity";
import { FoodSlugResponse } from "../../domain/response/food-by-slug-response";
import FoodCelebrate from "../../domain/entity/food-celebrate.entity";
import { FoodCelebrateResponse } from "../../domain/response/food-celebrate-response";

export default class FoodDbRepo implements FoodRepo {
  private endpoint: FoodEndpoint;
  private fetchHandler: FetchHandler;

  constructor() {
    this.endpoint = new FoodEndpoint();
    this.fetchHandler = new FetchHandler();
  }

  fetchFoodList(): ApiTask<FoodList[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.food,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("food list", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<FoodListResponse[]>>,
          () => new FoodParseFailure("food list", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => FoodList.fromResponse(item)))
          : TE.left(
            new FoodParseFailure("food list", "Expected array but got different type")
          )
      ),
      map((foodLists) => foodLists.map((foodList) => new FoodList(foodList)))
    );
  }

  fetchFoodHighlight(): ApiTask<FoodHighlight[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.highlight,
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("food highlight", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<FoodHighlightResponse[]>>,
          () => new FoodParseFailure("food highlight", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => FoodHighlight.fromResponse(item)))
          : TE.left(
            new FoodParseFailure("food highlight", "Expected array but got different type")
          )
      ),
      map((highlights) => highlights.map((highlight) => new FoodHighlight(highlight)))
    );
  }

  fetchFoodBySlug(slug: string): ApiTask<FoodSlug> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.foodBySlug(slug),
        method: "GET",
      }),
      mapLeft((error) => new FoodFetchFailure("food by slug", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<FoodSlugResponse>>,
          () => new FoodParseFailure("food by slug", "Failed to parse JSON response")
        )
      ),
      map((result) => FoodSlug.fromResponse(result.data))
    );
  }

  fetchCelebrate(): ApiTask<FoodCelebrate[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.celebrate,
        method: "GET",
      }),
      mapLeft((error) => {
        console.error("[FoodCelebrate] Fetch failed:", error);
        return new FoodFetchFailure("food celebrate", error.message);
      }),
      chain((response) =>
        TE.tryCatch(
          async () => {
            const json = await response.json();
            console.log("[FoodCelebrate] Raw response:", json);
            return json as ApiResponse<FoodCelebrateResponse[]>;
          },
          (error) => {
            console.error("[FoodCelebrate] JSON parse failed:", error);
            return new FoodParseFailure("food celebrate", "Failed to parse JSON response");
          }
        )
      ),
      chain((result) => {
        console.log("[FoodCelebrate] Parsed data:", result.data);

        if (!Array.isArray(result.data)) {
          console.error("[FoodCelebrate] Expected array, got:", typeof result.data);
          return TE.left(
            new FoodParseFailure("food celebrate", "Expected array but got different type")
          );
        }

        try {
          const celebrates = result.data.map((item, index) => {
            console.log(`[FoodCelebrate] Processing item ${index}:`, item);
            return FoodCelebrate.fromResponse(item);
          });

          console.log("[FoodCelebrate] Final entities:", celebrates);
          return TE.right(celebrates);
        } catch (error) {
          console.error("[FoodCelebrate] Entity mapping failed:", error);
          return TE.left(
            new FoodParseFailure("food celebrate", `Failed to map entities: ${error}`)
          );
        }
      })
    );
  }
}
