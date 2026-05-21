import VenueEndpoint from "@/bootstrap/endpoint/endpoints/venue-endpoints";
import VenueRepo from "../../domain/i-repo/venue.i-repo";
import FetchHandler from "@/feature/common/data/fetch-handler";
import ApiTask from "@/feature/common/data/api-task";
import VenueBySlug from "../../domain/entity/venue-by-slug.entity";
import Venue from "../../domain/entity/venue-list.entity";
import { pipe } from "fp-ts/lib/function";
import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import { VenueFetchFailure } from "../../domain/failure/venue-failure";
import { ApiResponse } from "@/types/api-response.types";
import { VenueResponse } from "../../domain/response/venue-list.response";
import * as TE from "fp-ts/lib/TaskEither";


export default class VenueDbRepo implements VenueRepo {
  private endpoint: VenueEndpoint;
  private fetchHandler: FetchHandler;

  constructor() {
    this.endpoint = new VenueEndpoint();
    this.fetchHandler = new FetchHandler();
  }
  fetchVenueList(): ApiTask<Venue[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.venue,
        method: "GET",
      }),
      mapLeft((error) => new VenueFetchFailure("venue list", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<VenueResponse[]>>,
          () => new VenueFetchFailure("venue list", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => Venue.fromResponse(item)))
          : TE.left(new VenueFetchFailure("venue list", "Expected array but got different type"))
      ),
      map((venues) => venues.map((venue) => new Venue(venue)))
    );
  }
  fetchGalleryVenueList(): ApiTask<string[]> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.galleryVenue,
        method: "GET",
      }),
      mapLeft((error) => new VenueFetchFailure("gallery venue list", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<string[]>>,
          () => new VenueFetchFailure("gallery venue list", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data)
          : TE.left(new VenueFetchFailure("gallery venue list", "Expected array but got different type"))
      )
    );
  }
  fetchVenueBySlug(slug: string): ApiTask<VenueBySlug | null> {
    return pipe(
      this.fetchHandler.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.venueBySlug(slug),
        method: "GET",
      }),
      mapLeft((error) => new VenueFetchFailure(`venue with slug ${slug}`, error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<VenueBySlug>>,
          () => new VenueFetchFailure(`venue with slug ${slug}`, "Failed to parse JSON response")
        )
      ),
      map((result) => (result.data ? new VenueBySlug(result.data) : null))
    );
  }
}