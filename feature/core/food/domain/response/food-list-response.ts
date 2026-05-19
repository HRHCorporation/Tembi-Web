import { FoodItemResponse } from "./food-item.response";

export type FoodListResponse = {
  id: number;
  name_ind: string;
  name_eng: string;
  description_card_ind: string | null;
  description_card_eng: string | null;
  subtitle_menu_ind: string | null;
  subtitle_menu_eng: string | null;
  minimum_pax: number;
  image: string;
  primary_foods: FoodItemResponse[];
};