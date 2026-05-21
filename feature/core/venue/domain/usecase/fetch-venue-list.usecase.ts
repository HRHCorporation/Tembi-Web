import ApiTask from "@/feature/common/data/api-task";
import Venue from "../entity/venue-list.entity";
import { diResolve } from "@/feature/common/features.di";
import VenueRepo, { venueRepoKey } from "../i-repo/venue.i-repo";
import { venueModuleKey } from "../../venue.module-key";

export default function fetchVenueUsecase(): ApiTask<Venue[]> {
  const repo = diResolve<VenueRepo>(venueModuleKey, venueRepoKey);
  return repo.fetchVenueList();
}