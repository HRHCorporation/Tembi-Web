import Facilities from "@/feature/core/venue/domain/entity/facilities.entity";

type RoomListData = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  tiers_name?: string;
  gallery_count?: number;
  facilities?: Facilities[];
};

export default class RoomList {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  number_guest?: number;
  spacious_room?: string;
  slug?: string;
  imagebanner?: string;
  tiers_name?: string;
  gallery_count?: number;
  facilities?: Facilities[];

  constructor(data: RoomListData) {
    this.id = data.id;
    this.title_ind = data.title_ind;
    this.title_eng = data.title_eng;
    this.description_ind = data.description_ind;
    this.description_eng = data.description_eng;
    this.number_guest = data.number_guest;
    this.spacious_room = data.spacious_room;
    this.slug = data.slug;
    this.imagebanner = data.imagebanner;
    this.tiers_name = data.tiers_name;
    this.gallery_count = data.gallery_count;
    this.facilities = data.facilities;
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

  static fromResponse(response: RoomListData): RoomList {
    const facilities =
      response.facilities?.map((facility) =>
        Facilities.fromResponse(facility),
      ) || [];
    return new RoomList({
      id: response.id,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      number_guest: response.number_guest,
      spacious_room: response.spacious_room,
      slug: response.slug,
      imagebanner: response.imagebanner,
      tiers_name: response.tiers_name,
      gallery_count: response.gallery_count,
      facilities: facilities,
    });
  }
}
