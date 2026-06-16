import { FACILITY_ICONS, FacilityIcon } from "@/components/admin/constants/facility-icons";
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

getIcon(): string {
    if (!this.icon || this.icon.trim() === "") {
      return "/images/icons/default-amenity.png";
    }

    if (this.icon.startsWith("/images") || this.icon.startsWith("http")) {
      return this.icon;
    }

    const foundIcon = FACILITY_ICONS.find((item) => item.value === this.icon);

    if (foundIcon) {
      const fileName = this.icon.replace("Icon", "").toLowerCase();
      return `/images/icons/${fileName}.png`;
    }

    return `/images/icons/${this.icon.toLowerCase()}.png`;
  }

  getIconConfig(): FacilityIcon | undefined {
    if (!this.icon) return undefined;
    return FACILITY_ICONS.find((item) => item.value === this.icon);
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