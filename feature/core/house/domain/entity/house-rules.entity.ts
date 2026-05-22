import { id } from "fp-ts/lib/Refinement";
import { HouseRulesResponse } from "../response/house-rules.response";

type HouseRuleData = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
}

export default class HouseRule {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;

  constructor(data: HouseRuleData) {
    this.id = data.id;
    this.icon = data.icon;
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

  getIcon(): string | undefined {
    return this.icon && this.icon.trim() !== "" ? this.icon : undefined;
  }

  static fromResponse(data: HouseRulesResponse): HouseRule {
    return new HouseRule(
      {
        id: data.id,
        icon: data.icon,
        name_eng: data.name_eng,
        name_ind: data.name_ind
      }
    );
  }
}