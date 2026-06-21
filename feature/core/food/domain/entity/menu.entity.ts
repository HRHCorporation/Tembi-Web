import { FACILITY_ICONS, FacilityIcon } from "@/components/admin/constants/facility-icons";
import { MenuResponse } from "../response/menu.response";
import FoodItem from "./food-item.entity";

export default class Menu {
  id?: number;
  name_ind?: string;
  name_eng?: string;
  subname_ind?: string;
  subname_eng?: string;
  icon?: string;
  foods?: FoodItem[];

  constructor({
    id,
    name_ind,
    name_eng,
    subname_ind,
    subname_eng,
    icon,
    foods,
  }: Partial<Menu>) {
    this.id = id;
    this.name_ind = name_ind;
    this.name_eng = name_eng;
    this.subname_ind = subname_ind;
    this.subname_eng = subname_eng;
    this.icon = icon;
    this.foods = foods;
  }

  getName(language: "id" | "en"): string {
    return language === "id"
      ? this.name_ind || ""
      : this.name_eng || this.name_ind || "";
  }

  getSubname(language: "id" | "en"): string {
    return language === "id"
      ? this.subname_ind || ""
      : this.subname_eng || this.subname_ind || "";
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

  getFoodItems(): FoodItem[] {
    return this.foods || [];
  }

  static fromResponse(response: MenuResponse): Menu {
    return new Menu({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      subname_ind: response.subname_ind,
      subname_eng: response.subname_eng,
      icon: response.icon,
      foods: response.foods?.map((food) => FoodItem.fromResponse(food)),
    });
  }
}
