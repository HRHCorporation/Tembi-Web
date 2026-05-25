import { VenueSlugResponse } from "../response/venue-by-slug.response";
import AllGaleries from "./all-galleries.entity";
import Facilities from "./facilities.entity";
import FacilityAddOns from "./facility-add-ons.entity";
import Keys from "./keys.entity";
import PreviewImage from "./preview-images.entity";

export default class VenueBySlug {
  id: number;
  name_eng?: string
  name_ind?: string
  description_eng?: string
  description_ind?: string
  slug?: string
  imagebanner?: string
  keys?: Keys[];
  facilities?: Facilities[];
  facility_add_ons?: FacilityAddOns[];
  preview_images?: PreviewImage[];
  all_galleries?: AllGaleries[];

  constructor({ id, name_eng, name_ind, description_eng, description_ind, slug, imagebanner, keys, facilities, facility_add_ons, preview_images, all_galleries }: { id: number; name_eng?: string; name_ind?: string; description_eng?: string; description_ind?: string; slug?: string; imagebanner?: string; keys?: Keys[]; facilities?: Facilities[]; facility_add_ons?: FacilityAddOns[]; preview_images?: PreviewImage[]; all_galleries?: AllGaleries[] }) {
    this.id = id;
    this.name_eng = name_eng;
    this.name_ind = name_ind;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
    this.slug = slug;
    this.imagebanner = imagebanner;
    this.keys = keys;
    this.facilities = facilities;
    this.facility_add_ons = facility_add_ons;
    this.preview_images = preview_images;
    this.all_galleries = all_galleries;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  hasImageBanner(): boolean {
    return !!this.imagebanner && this.imagebanner.trim() !== "";
  }

  getKeys(): Keys[] | undefined {
    return this.keys && this.keys.length > 0 ? this.keys : undefined;
  }

  getFacilities(): Facilities[] | undefined {
    return this.facilities && this.facilities.length > 0 ? this.facilities : undefined;
  }

  getFacilityAddOns(): FacilityAddOns[] | undefined {
    return this.facility_add_ons && this.facility_add_ons.length > 0 ? this.facility_add_ons : undefined;
  }

  getPreviewImages(): PreviewImage[] | undefined {
    return this.preview_images && this.preview_images.length > 0 ? this.preview_images : undefined;
  }

  getAllGalleries(): AllGaleries[] | undefined {
    return this.all_galleries && this.all_galleries.length > 0 ? this.all_galleries : undefined;
  }

  static fromResponse(response: VenueSlugResponse): VenueBySlug {
    const keys = response.keys?.map((keyResponse) => Keys.fromResponse(keyResponse));
    const facilities = response.facilities?.map((facilityResponse) => Facilities.fromResponse(facilityResponse));
    const facilityAddOns = response.facility_add_ons?.map((addOnResponse) => FacilityAddOns.fromResponse(addOnResponse));
    const previewImages = response.preview_images?.map((previewImageResponse) => PreviewImage.fromResponse(previewImageResponse));
    const allGalleries = response.all_galleries?.map((galleryResponse) => AllGaleries.fromResponse(galleryResponse));
    return new VenueBySlug({
      id: response.id,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      description_eng: response.description_eng,
      description_ind: response.description_ind,
      slug: response.slug,
      imagebanner: response.imagebanner,
      keys: keys,
      facilities: facilities,
      facility_add_ons: facilityAddOns,
      preview_images: previewImages,
      all_galleries: allGalleries
    });
  }
}