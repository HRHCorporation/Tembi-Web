import { FoodHighlightResponse } from "../response/food-highlight-response";
import OurMenu from "./our-menu.entity";

type FoodHighlightData = {
  id: number;
  name_ind: string;
  name_eng: string;
  description_menu_highlight_ind?: string;
  description_menu_highlight_eng?: string;
  menu_foods: OurMenu[];
};

export default class FoodHighlight {
  id: number;
  name_ind: string;
  name_eng: string;
  description_menu_highlight_ind?: string;
  description_menu_highlight_eng?: string;
  menu_foods: OurMenu[];

  constructor(data: FoodHighlightData) {
    this.id = data.id;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
    this.description_menu_highlight_ind =
      data.description_menu_highlight_ind || "";
    this.description_menu_highlight_eng =
      data.description_menu_highlight_eng || "";
    this.menu_foods = data.menu_foods || [];
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  hasItems(): boolean {
    return this.menu_foods && this.menu_foods.length > 0;
  }

  getTotalItems(): number {
    return this.menu_foods ? this.menu_foods.length : 0;
  }

  getHighlightDescription(language: "id" | "en"): string {
    const desc =
      language === "id"
        ? this.description_menu_highlight_ind
        : this.description_menu_highlight_eng;
    return desc || "";
  }

  static fromResponse(response: FoodHighlightResponse): FoodHighlight {
    return new FoodHighlight({
      id: response.id,
      name_ind: response.name_ind || "",
      name_eng: response.name_eng || "",
      description_menu_highlight_ind:
        response.description_menu_highlight_ind || "",
      description_menu_highlight_eng:
        response.description_menu_highlight_eng || "",
      menu_foods:
        response.menu_foods?.map((menu) => OurMenu.fromResponse(menu)) || [],
    });
  }
}
