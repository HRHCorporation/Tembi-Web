import { ServicesResponse } from "../response/services.response";
import Amenities from "./amenities.entity";

type ServicesData = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;
  amenities: Amenities[];
};

export default class Services {
  id: number;
  icon: string;
  name_eng: string;
  name_ind: string;
  is_addition: number;
  amenities: Amenities[];

  constructor(data: ServicesData) {
    this.id = data.id;
    this.icon = data.icon || "";
    this.name_eng = data.name_eng || "";
    this.name_ind = data.name_ind || "";
    this.is_addition = data.is_addition || 0;
    this.amenities = data.amenities || [];
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getAmenities(): Amenities[] {
    return this.amenities;
  }

  hasAmenities(): boolean {
    return this.amenities.length > 0;
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

  hasIcon(): boolean {
    return !!this.icon && this.icon.trim() !== "";
  }

  static fromResponse(response: ServicesResponse): Services {
    const amenities = (response.amenities || []).map((amenity) =>
      Amenities.fromResponse(amenity),
    );

    return new Services({
      id: response.id,
      icon: response.icon,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      is_addition: response.is_addition,
      amenities: amenities,
    });
  }
}
