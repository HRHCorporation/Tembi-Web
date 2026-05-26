import Menu from "./menu.entity";
import Package from "./package.entity";

export type FoodSlugProps = {
  id: number;
  type_catering_service_ind: string;
  type_catering_service_eng: string;
  name_ind: string;
  name_eng: string;
  description_ind: string;
  description_eng: string;
  minimum_pax: number;
  hours_service_min: number;
  hours_service_max: number;
  title_menu_ind: string | null;
  title_menu_eng: string | null;
  subtitle_menu_ind: string | null;
  subtitle_menu_eng: string | null;
  description_menu_ind: string | null;
  description_menu_eng: string | null;
  image: string;
  slug: string;
  menus?: Menu[];
  packages?: Package[];
};

export default class FoodSlug {
  id: number;
  type_catering_service_ind: string;
  type_catering_service_eng: string;
  name_ind: string;
  name_eng: string;
  description_ind: string;
  description_eng: string;
  image: string;
  slug: string;
  minimum_pax: number;
  hours_service_min: number;
  hours_service_max: number;
  title_menu_ind: string | null;
  title_menu_eng: string | null;
  subtitle_menu_ind: string | null;
  subtitle_menu_eng: string | null;
  description_menu_ind: string | null;
  description_menu_eng: string | null;
  menus?: Menu[];
  packages?: Package[];

  constructor(data: FoodSlugProps) {
    this.id = data.id;
    this.type_catering_service_ind = data.type_catering_service_ind;
    this.type_catering_service_eng = data.type_catering_service_eng;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
    this.description_ind = data.description_ind;
    this.description_eng = data.description_eng;
    this.image = data.image;
    this.slug = data.slug;
    this.minimum_pax = data.minimum_pax;
    this.hours_service_min = data.hours_service_min;
    this.hours_service_max = data.hours_service_max;
    this.title_menu_ind = data.title_menu_ind;
    this.title_menu_eng = data.title_menu_eng;
    this.subtitle_menu_ind = data.subtitle_menu_ind;
    this.subtitle_menu_eng = data.subtitle_menu_eng;
    this.description_menu_ind = data.description_menu_ind;
    this.description_menu_eng = data.description_menu_eng;

    this.menus = data.menus?.map((menu) =>
      menu instanceof Menu ? menu : new Menu(menu)
    );
    this.packages = data.packages?.map((pkg) =>
      pkg instanceof Package ? pkg : new Package(pkg)
    );
  }

  getTypeCateringService(language: "id" | "en"): string {
    return language === "id"
      ? this.type_catering_service_ind
      : this.type_catering_service_eng || this.type_catering_service_ind;
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getMinimumPax(language: "id" | "en"): string {
    return language === "id"
      ? "Minimal " + this.minimum_pax.toString() + " pax"
      : "Minimum " + this.minimum_pax.toString() + " pax";
  }

  getHourService(language: "id" | "en"): string {
    return language === "id" ? this.hours_service_min + "-" + this.hours_service_max + " jam servis" : this.hours_service_min + "-" + this.hours_service_max + " hours service";
  }

  getTitleMenu(language: "id" | "en"): string | null {
    return language === "id" ? this.title_menu_ind : this.title_menu_eng || this.title_menu_ind;
  }

  getSubtitleMenu(language: "id" | "en"): string | null {
    return language === "id" ? this.subtitle_menu_ind : this.subtitle_menu_eng || this.subtitle_menu_ind;
  }

  getDescriptionMenu(language: "id" | "en"): string | null {
    return language === "id" ? this.description_menu_ind : this.description_menu_eng || this.description_menu_ind;
  }

  getPricingTitle(language: "id" | "en"): string {
    return language === "id" ? "Opsi " + this.name_ind : this.name_eng + " Options";
  }

  getPricingSubtitle(language: "id" | "en"): string {
    return language === "id" ? "Pilih paket kamu" : "Choose your package";
  }

  getPricingDescription(language: "id" | "en"): string {
    return language === "id" ? "Pilih paket yang paling cocok untuk kebutuhan Anda" : "Choose the package that best fits your needs";
  }

  hasImage(): boolean {
    return !!this.image && this.image.trim() !== "";
  }

  hasMenus(): boolean {
    return !!this.menus && this.menus.length > 0;
  }

  hasPackages(): boolean {
    return !!this.packages && this.packages.length > 0;
  }

  static fromResponse(response: any): FoodSlug {
    return new FoodSlug({
      id: response.id,
      type_catering_service_ind: response.type_catering_service_ind,
      type_catering_service_eng: response.type_catering_service_eng,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      image: response.image,
      slug: response.slug,
      minimum_pax: response.minimum_pax,
      menus: response.our_menus?.map((menu: any) => {
        console.log("🍽️ Processing menu:", menu);
        return Menu.fromResponse(menu);
      }) || [], packages: response.packages?.map((pkg: any) => Package.fromResponse(pkg)),
      hours_service_min: response.hours_service_min,
      hours_service_max: response.hours_service_max,
      title_menu_ind: response.title_menu_ind,
      title_menu_eng: response.title_menu_eng,
      subtitle_menu_ind: response.subtitle_menu_ind,
      subtitle_menu_eng: response.subtitle_menu_eng,
      description_menu_ind: response.description_menu_ind,
      description_menu_eng: response.description_menu_eng,
    });
  }
}