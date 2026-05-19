import { FoodSlugResponse } from "../response/food-by-slug-response";
import Menu from "./menu.entity";
import Package from "./package.entity";

export default class FoodSlug {
  id?: number;
  name_ind?: string;
  name_eng?: string;
  description_ind?: string;
  description_eng?: string;
  minimum_pax?: number;
  hours_service_min?: number;
  hours_service_max?: number;
  title_menu_ind?: string;
  title_menu_eng?: string;
  subtitle_menu_ind?: string | null;
  subtitle_menu_eng?: string | null;
  description_menu_ind?: string;
  description_menu_eng?: string;
  image?: string;
  slug?: string;
  our_menus?: Menu[];
  packages?: Package[];

  constructor(data: Partial<FoodSlug>) {
    this.id = data.id;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
    this.description_ind = data.description_ind;
    this.description_eng = data.description_eng;
    this.minimum_pax = data.minimum_pax;
    this.hours_service_min = data.hours_service_min;
    this.hours_service_max = data.hours_service_max;
    this.title_menu_ind = data.title_menu_ind;
    this.title_menu_eng = data.title_menu_eng;
    this.subtitle_menu_ind = data.subtitle_menu_ind;
    this.subtitle_menu_eng = data.subtitle_menu_eng;
    this.description_menu_ind = data.description_menu_ind;
    this.description_menu_eng = data.description_menu_eng;
    this.image = data.image;
    this.slug = data.slug;
    this.our_menus = data.our_menus;
    this.packages = data.packages;
  }

  getName(language: "id" | "en"): string {
    return language === "id"
      ? this.name_ind || ""
      : this.name_eng || this.name_ind || "";
  }

  getDescription(language: "id" | "en"): string {
    return language === "id"
      ? this.description_ind || ""
      : this.description_eng || this.description_ind || "";
  }

  getTitleMenu(language: "id" | "en"): string {
    return language === "id"
      ? this.title_menu_ind || ""
      : this.title_menu_eng || this.title_menu_ind || "";
  }

  getSubtitleMenu(language: "id" | "en"): string | null {
    return language === "id"
      ? this.subtitle_menu_ind ?? null
      : this.subtitle_menu_eng ?? this.subtitle_menu_ind ?? null;
  }

  getDescriptionMenu(language: "id" | "en"): string {
    return language === "id"
      ? this.description_menu_ind || ""
      : this.description_menu_eng || this.description_menu_ind || "";
  }


  static fromResponse(response: FoodSlugResponse): FoodSlug {
    return new FoodSlug({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      minimum_pax: response.minimum_pax,
      hours_service_min: response.hours_service_min,
      hours_service_max: response.hours_service_max,
      title_menu_ind: response.title_menu_ind,
      title_menu_eng: response.title_menu_eng,
      subtitle_menu_ind: response.subtitle_menu_ind,
      subtitle_menu_eng: response.subtitle_menu_eng,
      description_menu_ind: response.description_menu_ind,
      description_menu_eng: response.description_menu_eng,
      image: response.image,
      slug: response.slug,
      our_menus: response.our_menus?.map((menu: any) => Menu.fromResponse(menu)),
      packages: response.packages?.map((pkg: any) => Package.fromResponse(pkg)),
    });
  }
}
