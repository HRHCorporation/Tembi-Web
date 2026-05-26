import { AmenitiesResponse } from "../response/amenities.response";

type AmenitiesData = {
  id: number;
  name_eng?: string;
  name_ind?: string;
}

export default class Amenities {
  id: number;
  name_eng?: string;
  name_ind?: string;

  constructor(data: AmenitiesData) {
    this.id = data.id;
    this.name_eng = data.name_eng;
    this.name_ind = data.name_ind;
  }

  getName(language: "id" | "en"): string {
    if (language === "id") {
      return this.name_ind || "";
    } else {
      return this.name_eng || "";
    }
  }

  static fromResponse(response: AmenitiesResponse): Amenities {
    return new Amenities({
      id: response.id,
      name_eng: response.name_eng,
      name_ind: response.name_ind
    });
  }
}