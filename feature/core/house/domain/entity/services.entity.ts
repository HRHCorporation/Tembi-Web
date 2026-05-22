import { ServicesResponse } from "../response/services.response";
import Amenities from "./amenities.entity";

type ServicesData = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;
  amenities?: Amenities[];
}

export default class Services {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;
  amenities?: Amenities[];

  constructor(data: ServicesData) {
    this.id = data.id;
    this.icon = data.icon;
    this.name_eng = data.name_eng;
    this.name_ind = data.name_ind;
    this.is_addition = data.is_addition;
    this.amenities = data.amenities;
  }

  static fromResponse(response: ServicesResponse): Services {
    return new Services({
      id: response.id,
      icon: response.icon,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      is_addition: response.is_addition,
      amenities: (response.amenities || []) as Amenities[]
    });
  }

  getName(language: "id" | "en"): string {
    if (language === "id") {
      return this.name_ind || "";
    } else {
      return this.name_eng || "";
    }
  }

  getAmenities(): Amenities[] {
    return this.amenities || [];
  }
}