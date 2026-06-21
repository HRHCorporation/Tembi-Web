import {
  FACILITY_ICONS,
  FacilityIcon,
} from "@/components/admin/constants/facility-icons";
import { ServicesAddResponse } from "../response/services-add.response";

type ServicesAddData = {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;
};

export default class ServicesAdd {
  id: number;
  icon?: string;
  name_eng?: string;
  name_ind?: string;
  is_addition?: number;

  constructor(data: ServicesAddData) {
    this.id = data.id;
    this.icon = data.icon;
    this.name_eng = data.name_eng;
    this.name_ind = data.name_ind;
    this.is_addition = data.is_addition;
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

  static fromResponse(data: ServicesAddResponse): ServicesAdd {
    return new ServicesAdd({
      id: data.id,
      icon: data.icon,
      name_eng: data.name_eng,
      name_ind: data.name_ind,
      is_addition: data.is_addition,
    });
  }
}
