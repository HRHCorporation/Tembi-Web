import { FacilitiesResponse } from "@/feature/core/venue/domain/response/facilities.response";

export type VenueResponse = {
  id: number;
  name_ind?: string;
  name_eng?: string
  description_ind?: string;
  description_eng?: string;
  imagebanner?: string;
  slug?: string;
  facilities?: FacilitiesResponse[];
}