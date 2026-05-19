import { FoodItemResponse } from "../response/food-item.response";

export default class FoodItem {
  id: number;
  name_ind: string;
  name_eng: string;

  constructor({ id, name_ind, name_eng }: { id: number; name_ind: string; name_eng: string }) {
    this.id = id;
    this.name_ind = name_ind;
    this.name_eng = name_eng;
  }


  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }


  static fromResponse(response: FoodItemResponse): FoodItem {
    return new FoodItem({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
    });
  }
}