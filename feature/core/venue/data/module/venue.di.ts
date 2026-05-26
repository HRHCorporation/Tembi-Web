import { DependencyContainer } from "tsyringe";
import { venueRepoKey } from "../../domain/i-repo/venue.i-repo";
import VenueDbRepo from "../repo/venue-db.repo";

export default function getVenueDi(di: DependencyContainer) {
  di.register(venueRepoKey, VenueDbRepo);
  return di;
}