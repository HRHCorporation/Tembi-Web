import { FacilitiesResponse } from "../response/facilities.response";

export default class Facilities {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  description_eng?: string;
  description_ind?: string;

  constructor({
    id,
    icon,
    name_eng,
    name_ind,
    description_eng,
    description_ind,
  }: {
    id: number;
    icon?: string;
    name_eng: string;
    name_ind: string;
    description_eng?: string;
    description_ind?: string;
  }) {
    this.id = id;
    this.icon = icon;
    this.name_eng = name_eng;
    this.name_ind = name_ind;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind || "" : this.name_eng || "";
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id"
      ? this.description_ind || undefined
      : this.description_eng || undefined;
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

  static fromResponse(response: FacilitiesResponse): Facilities {
    return new Facilities({
      id: response.id,
      icon: response.icon,
      name_eng: response.name_eng ?? "",
      name_ind: response.name_ind ?? "",
      description_eng: response.description_eng ?? "",
      description_ind: response.description_ind ?? "",
    });
  }
}
