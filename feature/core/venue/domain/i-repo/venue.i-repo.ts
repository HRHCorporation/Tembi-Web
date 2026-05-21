import ApiTask from "@/feature/common/data/api-task";
import Venue from "../entity/venue-list.entity";
import VenueBySlug from "../entity/venue-by-slug.entity";

export default interface VenueRepo {
  fetchVenueList(): ApiTask<Venue[]>;
  fetchGalleryVenueList(): ApiTask<string[]>;
  fetchVenueBySlug(slug: string): ApiTask<VenueBySlug | null>;
}

export const venueRepoKey = 'venueRepoKey';