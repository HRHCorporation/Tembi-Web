import ApiTask from "@/feature/common/data/api-task";
import ServicesAdd from "../entity/services-add.entity";
import Services from "../entity/services.entity";
import RoomList from "../entity/room-list.entity";
import RoomRecommendation from "../entity/room-recomendation.entity";
import RoomSlug from "../entity/room-slug.entity";

export default interface HouseRepo {
  fetchServicesAdd(): ApiTask<ServicesAdd[]>;
  fetchServices(): ApiTask<Services[]>
  fetchRoomList(): ApiTask<RoomList[]>;
  fetchRoomRecomendation(): ApiTask<RoomRecommendation[]>;
  fetchRoomBySlug(slug: string): ApiTask<RoomSlug>;
}

export const houseRepoKey = 'houseRepoKey';