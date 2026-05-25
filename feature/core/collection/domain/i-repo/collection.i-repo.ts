import ApiTask from "@/feature/common/data/api-task";
import Collection from "../entity/collection.entity";

export default interface CollectionRepo {
  fetchCollectionList(): ApiTask<Collection[]>;
}

export const collectionRepoKey = 'collectionRepoKey';