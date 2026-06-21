import AllGaleries from "@/feature/core/venue/domain/entity/all-galleries.entity";
import Facilities from "@/feature/core/venue/domain/entity/facilities.entity";
import Policies from "./policies.entity";
import HouseRule from "./house-rules.entity";
import { RoomSlugResponse } from "../response/room-slug.response";

type RoomSlugData = {
  id: number;
  title_ind: string;
  title_eng: string;
  subtitle_ind: string;
  subtitle_eng: string;
  description_ind: string;
  description_eng: string;
  number_guest: number;
  spacious_room: string;
  room_price: string;
  slug: string;
  mattress_name: string;
  tiers_name: string;
  imagebanner: string;
  facilities: Facilities[];
  galleries: AllGaleries[];
  policies: Policies;
  house_rules: HouseRule[];
};

export default class RoomSlug {
  id: number;
  title_ind: string;
  title_eng: string;
  subtitle_ind: string;
  subtitle_eng: string;
  description_ind: string;
  description_eng: string;
  number_guest: number;
  spacious_room: string;
  room_price: string;
  slug: string;
  mattress_name: string;
  tiers_name: string;
  imagebanner: string;
  facilities: Facilities[];
  galleries: AllGaleries[];
  policies: Policies;
  house_rules: HouseRule[];

  constructor(data: RoomSlugData) {
    this.id = data.id;
    this.title_ind = data.title_ind;
    this.title_eng = data.title_eng;
    this.subtitle_ind = data.subtitle_ind;
    this.subtitle_eng = data.subtitle_eng;
    this.description_ind = data.description_ind;
    this.description_eng = data.description_eng;
    this.number_guest = data.number_guest;
    this.spacious_room = data.spacious_room;
    this.room_price = data.room_price;
    this.slug = data.slug;
    this.mattress_name = data.mattress_name;
    this.tiers_name = data.tiers_name;
    this.imagebanner = data.imagebanner;
    this.facilities = data.facilities;
    this.galleries = data.galleries;
    this.policies = data.policies;
    this.house_rules = data.house_rules;
  }

  getTitle(language: "id" | "en"): string {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getSubtitle(language: "id" | "en"): string {
    return language === "id" ? this.subtitle_ind : this.subtitle_eng;
  }

  getDescription(language: "id" | "en"): string {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getFacilities(): Facilities[] {
    return this.facilities;
  }

  getGalleries(): AllGaleries[] {
    return this.galleries;
  }

  getPolicies(): Policies {
    return this.policies;
  }

  getHouseRules(): HouseRule[] {
    return this.house_rules;
  }

  getRoomPrice(): number {
    return parseFloat(this.room_price) || 0;
  }

  getFormattedPrice(): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(this.getRoomPrice());
  }

  static fromResponse(response: RoomSlugResponse): RoomSlug {
    const facilities =
      response.facilities?.map((facility) =>
        Facilities.fromResponse(facility),
      ) || [];

    const galleries =
      response.galleries?.map((gallery) => AllGaleries.fromResponse(gallery)) ||
      [];

    const policies = response.policies
      ? Policies.fromResponse(response.policies)
      : new Policies({ CHECKIN_CHECKOUT: [], CANCELLATION_POLICY: [] });

    const houseRules =
      response.house_rules?.map((rule) => HouseRule.fromResponse(rule)) || [];

    return new RoomSlug({
      id: response.id,
      title_ind: response.title_ind || "",
      title_eng: response.title_eng || "",
      subtitle_ind: response.subtitle_ind || "",
      subtitle_eng: response.subtitle_eng || "",
      description_ind: response.description_ind || "",
      description_eng: response.description_eng || "",
      number_guest: response.number_guest || 0,
      spacious_room: response.spacious_room || "",
      room_price: response.room_price || "0",
      slug: response.slug || "",
      mattress_name: response.mattress_name || "",
      tiers_name: response.tiers_name || "",
      imagebanner: response.imagebanner || "",
      facilities: facilities,
      galleries: galleries,
      policies: policies,
      house_rules: houseRules,
    });
  }
}
