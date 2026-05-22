import ApiTask from "@/feature/common/data/api-task";
import CollectionRepo from "../../domain/i-repo/collection.i-repo";
import { CollectionResponse } from "../../domain/response/collection-response";
import { chain, map, mapLeft } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import CollectionEndpoint from "@/bootstrap/endpoint/endpoints/collection-endpoints";
import FetchHandler from "@/feature/common/data/fetch-handler";
import { CollectionFetchFailure, CollectionParseFailure } from '../../domain/failure/collection-failure';
import { ApiResponse } from "@/types/api-response.types";
import { pipe } from "fp-ts/lib/function";
import Collection from '../../domain/entity/collection.response';

export default class CollectionDbRepo implements CollectionRepo {
  private endpoint: CollectionEndpoint;
  private fetchHanlder: FetchHandler;

  constructor() {
    this.endpoint = new CollectionEndpoint();
    this.fetchHanlder = new FetchHandler();
  }

  fetchCollectionList(): ApiTask<CollectionResponse[]> {
    return pipe(
      this.fetchHanlder.fetchWithoutAuthWithRepsonseStatus({
        endpoint: this.endpoint.collection,
        method: "GET",
      }),
      mapLeft((error) => new CollectionFetchFailure("collection list", error.message)),
      chain((response) =>
        TE.tryCatch(
          () => response.json() as Promise<ApiResponse<CollectionResponse[]>>,
          () => new CollectionParseFailure("collection list", "Failed to parse JSON response")
        )
      ),
      chain((result) =>
        Array.isArray(result.data)
          ? TE.right(result.data.map((item) => Collection.fromResponse(item)))
          : TE.left(new CollectionParseFailure("collection list", "Parsed data is not an array"))
      ),
      map((collections) => collections.map((collection) => new Collection(collection)))
    )
  }
}