import { VenueResponse } from "../response/venue-list.response";
import Facilities from "./facilities.entity";

export default class Venue {
  id: number;
  name_eng?: string
  name_ind?: string;
  description_eng?: string
  description_ind?: string
  slug?: string;
  imagebanner?: string
  capacity_ind?: string;
  capacity_eng?: string;
  facilities?: Facilities[];

  constructor({ id, name_eng, name_ind, description_eng, description_ind, slug, imagebanner, capacity_ind, capacity_eng, facilities }: { id: number; name_eng?: string; name_ind?: string; description_eng?: string; description_ind?: string; slug?: string; imagebanner?: string; capacity_ind?: string; capacity_eng?: string; facilities?: Facilities[] }) {
    this.id = id;
    this.name_eng = name_eng;
    this.name_ind = name_ind;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
    this.slug = slug;
    this.imagebanner = imagebanner;
    this.capacity_ind = capacity_ind;
    this.capacity_eng = capacity_eng;
    this.facilities = facilities;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getCapacity(language: "id" | "en"): string | undefined {
    return language === "id" ? this.capacity_ind : this.capacity_eng;
  }

  hasImageBanner(): boolean {
    return !!this.imagebanner && this.imagebanner.trim() !== "";
  }

  static fromResponse(response: VenueResponse): Venue {
    return new Venue({
      id: response.id,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      description_eng: response.description_eng,
      description_ind: response.description_ind,
      slug: response.slug,
      imagebanner: response.imagebanner,
      capacity_ind: response.capacity_ind,
      capacity_eng: response.capacity_eng,
      facilities: response.facilities.map(Facilities.fromResponse)
    });
  }
}