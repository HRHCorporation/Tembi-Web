import { FacilitiesResponse } from "./facilities.response";

export type VenueResponse = {
  id: number;
  name_ind?: string;
  name_eng?: string;
  description_ind?: string;
  description_eng?: string;
  slug?: string;
  imagebanner?: string;
  capacity_ind?: string;
  capacity_eng?: string;
  facilities: FacilitiesResponse[];
}