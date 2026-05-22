import Facilities from "@/feature/core/venue/domain/entity/facilities.entity";
import { RoomRecommendationResponse } from "../response/room-recomendation.response";

type RoomRecommendationData = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  facilities?: Facilities[];
}

export default class RoomRecommendation {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  facilities?: Facilities[];

  constructor({ id, title_ind, title_eng, description_ind, description_eng, number_guest, spacious_room, slug, imagebanner, facilities }: RoomRecommendationData) {
    this.id = id;
    this.title_ind = title_ind;
    this.title_eng = title_eng;
    this.description_ind = description_ind;
    this.description_eng = description_eng;
    this.number_guest = number_guest;
    this.spacious_room = spacious_room;
    this.slug = slug;
    this.imagebanner = imagebanner;
    this.facilities = facilities;
  }

  getTitle(language: "id" | "en"): string | undefined {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  static fromResponse(response: RoomRecommendationResponse): RoomRecommendation {
    return new RoomRecommendation({
      id: response.id,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      number_guest: response.number_guest,
      spacious_room: response.spacious_room,
      slug: response.slug,
      imagebanner: response.imagebanner,
      facilities: (response.facilities || []) as Facilities[]
    });
  }
}