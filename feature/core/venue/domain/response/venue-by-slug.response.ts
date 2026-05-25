import { AllGalleryResponse } from "./all-galleries.response";
import { FacilitiesResponse } from "./facilities.response";
import { FacilityAddOnsResponse } from "./facility-add-ons.response";
import { KeysResponse } from "./keys.response";
import { PreviewImageResponse } from "./preview-images.response";

export type VenueSlugResponse = {
  id: number;
  name_ind?: string;
  name_eng?: string;
  description_ind?: string;
  description_eng?: string;
  slug?: string;
  imagebanner?: string;
  keys?: KeysResponse[];
  facilities?: FacilitiesResponse[];
  facility_add_ons?: FacilityAddOnsResponse[];
  preview_images?: PreviewImageResponse[];
  all_galleries?: AllGalleryResponse[];
}