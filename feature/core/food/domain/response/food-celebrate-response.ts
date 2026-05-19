import { FoodItemResponse } from "./food-item.response";

export type FoodCelebrateResponse = {
  id: number;
  name_ind: string;
  name_eng: string;
  description_ind: string;
  description_eng: string;
  image: string;
  items: FoodItemResponse[];
}