import ApiTask from "@/feature/common/data/api-task";
import { CollectionResponse } from "../response/collection-response";
import Collection from "@/feature/core/main/domain/entity/collection.entity";

export default interface CollectionRepo {
  fetchCollectionList(): ApiTask<Collection[]>;
}

export const collectionRepoKey = 'collectionRepoKey';