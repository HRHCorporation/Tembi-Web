import ApiTask from "@/feature/common/data/api-task";
import VenueBySlug from "../entity/venue-by-slug.entity";
import { diResolve } from "@/feature/common/features.di";
import VenueRepo, { venueRepoKey } from "../i-repo/venue.i-repo";
import { venueModuleKey } from "../../venue.module-key";

export default function fetchVenueBySlugUsecase(slug: string): ApiTask<VenueBySlug | null> {
  const repo = diResolve<VenueRepo>(venueModuleKey, venueRepoKey);
  return repo.fetchVenueBySlug(slug);
}