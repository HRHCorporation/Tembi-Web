import { AllGalleryResponse } from "@/feature/core/venue/domain/response/all-galleries.response";
import { FacilitiesResponse } from "@/feature/core/venue/domain/response/facilities.response";
import { PoliciesResponse } from "./policies.response";
import { HouseRulesResponse } from "./house-rules.response";

export type RoomSlugResponse = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  subtitle_ind?: string;
  subtitle_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  room_price?: string;
  slug?: string;
  mattress_name?: string;
  tiers_name?: string;
  imagebanner?: string;
  facilities?: FacilitiesResponse[];
  galleries?: AllGalleryResponse[];
  policies?: PoliciesResponse;
  house_rules?: HouseRulesResponse[];
}