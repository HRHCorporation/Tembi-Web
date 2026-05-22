import ApiTask from "@/feature/common/data/api-task";
import { CollectionResponse } from "../response/collection-response";
import { diResolve } from "@/feature/common/features.di";
import CollectionRepo, { collectionRepoKey } from "../i-repo/collection.i-repo";
import { collectionModuleKey } from "../../collection.module-key";

export default function fetchCollectionListUsecase(): ApiTask<CollectionResponse[]> {
  const repo = diResolve<CollectionRepo>(collectionModuleKey, collectionRepoKey);
  return repo.fetchCollectionList();
}