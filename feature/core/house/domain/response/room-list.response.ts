import { FacilitiesResponse } from "@/feature/core/venue/domain/response/facilities.response";

export type RoomListResponse = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  tiers_name?: string;
  gallery_count?: number;
  facilities?: FacilitiesResponse[];
}