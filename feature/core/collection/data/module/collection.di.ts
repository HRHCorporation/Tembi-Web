import { DependencyContainer } from "tsyringe";
import { collectionRepoKey } from "../../domain/i-repo/collection.i-repo";
import CollectionDbRepo from "../repo/collection-db.repo";

export default function getCollectionDi(di: DependencyContainer) {
  di.register(collectionRepoKey, CollectionDbRepo);
  return di;
}