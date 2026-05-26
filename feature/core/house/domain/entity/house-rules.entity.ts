import { HouseRulesResponse } from "../response/house-rules.response";

type HouseRuleData = {
  id: number;
  icon: string;
  name_eng: string;
  name_ind: string;
};

export default class HouseRule {
  id: number;
  icon: string;
  name_eng: string;
  name_ind: string;

  constructor(data: HouseRuleData) {
    this.id = data.id;
    this.icon = data.icon || "";
    this.name_eng = data.name_eng || "";
    this.name_ind = data.name_ind || "";
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getIcon(): string {
    return this.icon;
  }

  hasIcon(): boolean {
    return !!this.icon && this.icon.trim() !== "";
  }

  static fromResponse(response: HouseRulesResponse): HouseRule {
    return new HouseRule({
      id: response.id,
      icon: response.icon || "",
      name_eng: response.name_eng || "",
      name_ind: response.name_ind || "",
    });
  }
}
