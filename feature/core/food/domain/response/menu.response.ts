import { FoodItemResponse } from "./food-item.response";

export type MenuResponse = {
  id: number;
  icon?: string;
  foods?: FoodItemResponse[];
  name_eng?: string;
  name_ind?: string;
  subname_eng?: string;
  subname_ind?: string;
};