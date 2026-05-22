import ApiTask from "@/feature/common/data/api-task";
import { CollectionResponse } from "../response/collection-response";

export default interface CollectionRepo {
  fetchCollectionList(): ApiTask<CollectionResponse[]>;
}

export const collectionRepoKey = 'collectionRepoKey';