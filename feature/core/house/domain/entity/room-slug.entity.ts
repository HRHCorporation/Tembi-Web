import AllGaleries from "@/feature/core/venue/domain/entity/all-galleries.entity";
import Facilities from "@/feature/core/venue/domain/entity/facilities.entity";
import Policies from "./policies.entity";
import HouseRule from "./house-rules.entity";

type RoomSlugResponse = {
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
  facilities?: Facilities[];
  galleries?: AllGaleries[];
  policies?: Policies[];
  house_rules?: HouseRule[];
}

export default class RoomSlug {
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
  facilities?: Facilities[];
  galleries?: AllGaleries[];
  policies?: Policies[];
  house_rules?: HouseRule[];

  constructor({ id, title_ind, title_eng, subtitle_ind, subtitle_eng, description_ind, description_eng, number_guest, spacious_room, room_price, slug, mattress_name, tiers_name, imagebanner, facilities, galleries, policies, house_rules }: RoomSlugResponse) {
    this.id = id;
    this.title_ind = title_ind;
    this.title_eng = title_eng;
    this.subtitle_ind = subtitle_ind;
    this.subtitle_eng = subtitle_eng;
    this.description_ind = description_ind;
    this.description_eng = description_eng;
    this.number_guest = number_guest;
    this.spacious_room = spacious_room;
    this.room_price = room_price;
    this.slug = slug;
    this.mattress_name = mattress_name;
    this.tiers_name = tiers_name;
    this.imagebanner = imagebanner;
    this.facilities = facilities;
    this.galleries = galleries;
    this.policies = policies;
    this.house_rules = house_rules;
  }

  getTitle(language: "id" | "en"): string | undefined {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getSubtitle(language: "id" | "en"): string | undefined {
    return language === "id" ? this.subtitle_ind : this.subtitle_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  static fromResponse(response: RoomSlugResponse): RoomSlug {
    return new RoomSlug({
      id: response.id,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      subtitle_ind: response.subtitle_ind,
      subtitle_eng: response.subtitle_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      number_guest: response.number_guest,
      spacious_room: response.spacious_room,
      room_price: response.room_price,
      slug: response.slug,
      mattress_name: response.mattress_name,
      tiers_name: response.tiers_name,
      imagebanner: response.imagebanner,
      facilities: response.facilities,
      galleries: response.galleries,
      policies: response.policies,
      house_rules: response.house_rules
    });
  }
}