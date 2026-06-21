import { FacilityAddOnsResponse } from "../response/facility-add-ons.response";


type FacilityAddOnsData = {
  id: number;
  icon?: string;
  name_ind?: string;
  name_eng?: string;
  description_eng?: string;
  description_ind?: string;
}
export default class FacilityAddOns {
  id: number;
  icon?: string;
  name_ind?: string;
  name_eng?: string;
  description_eng?: string;
  description_ind?: string;

  constructor({
    id,
    icon,
    name_ind,
    name_eng,
    description_eng,
    description_ind,
  }: FacilityAddOnsData) {
    this.id = id;
    this.icon = icon;
    this.name_ind = name_ind;
    this.name_eng = name_eng;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getIcon(): string {
    if (!this.icon || this.icon.trim() === "") {
      return "/images/icons/default-amenity.png";
    }

    if (this.icon.startsWith("/images")) {
      return this.icon;
    }

    return `/images/icons/${this.icon}`;
  }

  static fromResponse(response: FacilityAddOnsResponse): FacilityAddOns {
    return new FacilityAddOns({
      id: response.id,
      icon: response.icon,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_eng: response.description_eng,
      description_ind: response.description_ind
    });
  }
}
