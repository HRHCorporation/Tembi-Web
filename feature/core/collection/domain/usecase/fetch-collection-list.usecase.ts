import ApiTask from "@/feature/common/data/api-task";
import { CollectionResponse } from "../response/collection-response";
import { diResolve } from "@/feature/common/features.di";
import CollectionRepo, { collectionRepoKey } from "../i-repo/collection.i-repo";
import { collectionModuleKey } from "../../collection.module-key";
import Collection from "../entity/collection.entity";

export default function fetchCollectionListUsecase(): ApiTask<Collection[]> {
  const repo = diResolve<CollectionRepo>(collectionModuleKey, collectionRepoKey);
  return repo.fetchCollectionList();
}