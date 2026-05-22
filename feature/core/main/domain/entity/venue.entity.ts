import Facilities from "@/feature/core/venue/domain/entity/facilities.entity";

type VenueData = {
  id: number;
  name_ind?: string;
  name_eng?: string
  description_ind?: string;
  description_eng?: string;
  imagebanner?: string;
  slug?: string;
  facilities?: Facilities[];
}

export default class Venue {
  id: number;
  nameInd?: string;
  nameEng?: string;
  descriptionInd?: string;
  descriptionEng?: string;
  imageBanner?: string;
  slug?: string;
  facilities?: Facilities[];

  constructor({
    id,
    name_ind,
    name_eng,
    description_ind,
    description_eng,
    imagebanner,
    slug,
    facilities
  }: VenueData) {
    this.id = id;
    this.nameInd = name_ind;
    this.nameEng = name_eng;
    this.descriptionInd = description_ind;
    this.descriptionEng = description_eng;
    this.imageBanner = imagebanner;
    this.slug = slug;
    this.facilities = facilities;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.nameInd : this.nameEng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.descriptionInd : this.descriptionEng;
  }

  getFacilities(): Facilities[] | undefined {
    return this.facilities;
  }

  static fromResponse(response: VenueData): Venue {
    const facilities = response.facilities?.map(facility => new Facilities({
      id: facility.id,
      icon: facility.icon,
      name_eng: facility.name_eng,
      name_ind: facility.name_ind,
      description_eng: facility.description_eng,
      description_ind: facility.description_ind
    }));
    return new Venue({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      imagebanner: response.imagebanner,
      slug: response.slug,
      facilities
    });
  }
}