import ApiTask from "@/feature/common/data/api-task";
import Collection from "../entity/collection.entity";
import Venue from "../entity/venue.entity";
import House from "../entity/house.entity";
import Carousel from "../entity/carousel.entity";

export default interface MainRepo {
  fetchCollections(): ApiTask<Collection[]>;
  fetchVenues(): ApiTask<Venue[]>;
  fetchHouses(): ApiTask<House[]>;
  fetchCarousels(): ApiTask<Carousel[]>;
}

export const mainRepoKey = 'mainRepoKey';