import { FacilityAddOnsResponse } from "../response/facility-add-ons.response";

export default class FacilityAddOns {
  id: number;
  name_eng?: string
  name_ind?: string;
  description_eng?: string
  description_ind?: string;

  constructor({ id, name_eng, name_ind, description_eng, description_ind }: { id: number; name_eng?: string; name_ind?: string; description_eng?: string; description_ind?: string }) {
    this.id = id;
    this.name_eng = name_eng;
    this.name_ind = name_ind;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  static fromResponse(response: FacilityAddOnsResponse): FacilityAddOns {
    return new FacilityAddOns({
      id: response.id,
      name_eng: response.name_end,
      name_ind: response.name_ind,
      description_eng: response.description_eng,
      description_ind: response.description_ind
    });
  }
}