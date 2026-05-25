import { AmenitiesResponse } from "./amenities.response";

export type ServicesResponse = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;
  amenities?: AmenitiesResponse[];
}