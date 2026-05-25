import { AllGalleryResponse } from "@/feature/core/venue/domain/response/all-galleries.response";

export type HouseResponse = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  slug?: string;
  is_recommendation?: number;
  galleries?: AllGalleryResponse[];
}