import { CancellationPolicyResponse } from "../response/cancellation.response";

type CancellationData = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
}

export default class CancellationPolicy {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;

  constructor(data: CancellationData) {
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

  static fromResponse(response: CancellationPolicyResponse): CancellationPolicy {
    return new CancellationPolicy({
      id: response.id,
      icon: response.icon,
      name_eng: response.name_eng,
      name_ind: response.name_ind
    });
  }
}