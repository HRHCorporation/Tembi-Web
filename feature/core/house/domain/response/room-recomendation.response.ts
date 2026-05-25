import { FacilitiesResponse } from "@/feature/core/venue/domain/response/facilities.response";

export type RoomRecommendationResponse = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  facilities?: FacilitiesResponse[];
}