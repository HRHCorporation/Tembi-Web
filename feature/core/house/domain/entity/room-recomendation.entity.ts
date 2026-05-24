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
};

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

  constructor(data: RoomRecommendationData) {
    this.id = data.id || 0;
    this.title_ind = data.title_ind || "";
    this.title_eng = data.title_eng || "";
    this.description_ind = data.description_ind || "";
    this.description_eng = data.description_eng || "";
    this.number_guest = data.number_guest || 0;
    this.spacious_room = data.spacious_room || "";
    this.slug = data.slug || "";
    this.imagebanner = data.imagebanner || "";
    this.facilities = data.facilities || [];
  }

  getTitle(language: "id" | "en"): string | undefined {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getFacilities(): Facilities[] {
    return this.facilities || [];
  }

  static fromResponse(
    response: RoomRecommendationResponse,
  ): RoomRecommendation {
    const facilities =
      response.facilities?.map((facility) => Facilities.fromResponse(facility)) ||
      [];
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
      facilities: facilities,
    });
  }
}
