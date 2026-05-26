import { MenuResponse } from "./menu.response";
import { PackageResponse } from "./package.response";

export type FoodSlugResponse = {
  id: number;
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
  our_menus?: MenuResponse[];
  packages?: PackageResponse[];
};