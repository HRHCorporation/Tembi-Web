import { FoodListResponse } from "../response/food-list-response";
import FoodItem from "./food-item.entity";

export type FoodListProps = {
  id: number;
  name_ind: string;
  name_eng: string;
  description_card_ind: string | null;
  description_card_eng: string | null;
  subtitle_menu_ind: string | null;
  subtitle_menu_eng: string | null;
  minimum_pax: number;
  image: string;
  primary_foods?: FoodItem[];
};

export default class FoodList {
  id: number;
  name_ind: string;
  name_eng: string;
  description_card_ind: string | null;
  description_card_eng: string | null;
  subtitle_menu_ind: string | null;
  subtitle_menu_eng: string | null;
  minimum_pax: number;
  image: string;
  primary_foods?: FoodItem[];

  constructor(data: FoodListProps) {
    this.id = data.id;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
    this.description_card_ind = data.description_card_ind;
    this.description_card_eng = data.description_card_eng;
    this.subtitle_menu_ind = data.subtitle_menu_ind;
    this.subtitle_menu_eng = data.subtitle_menu_eng;
    this.minimum_pax = data.minimum_pax;
    this.image = data.image;
    this.primary_foods = data.primary_foods;
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescriptionCard(language: "id" | "en"): string | null {
    return language === "id"
      ? this.description_card_ind
      : this.description_card_eng || this.description_card_ind;
  }

  getSubtitleMenu(language: "id" | "en"): string | null {
    return language === "id"
      ? this.subtitle_menu_ind
      : this.subtitle_menu_eng || this.subtitle_menu_ind;
  }

  hasImage(): boolean {
    return !!this.image && this.image.trim() !== "";
  }

  hasPrimaryFoods(): boolean {
    return !!this.primary_foods && this.primary_foods.length > 0;
  }

  static fromResponse(response: FoodListResponse): FoodList {
    return new FoodList({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_card_ind: response.description_card_ind,
      description_card_eng: response.description_card_eng,
      subtitle_menu_ind: response.subtitle_menu_ind,
      subtitle_menu_eng: response.subtitle_menu_eng,
      minimum_pax: response.minimum_pax,
      image: response.image,
      primary_foods: response.primary_foods?.map((food) =>
        FoodItem.fromResponse(food)
      ),
    });
  }
}