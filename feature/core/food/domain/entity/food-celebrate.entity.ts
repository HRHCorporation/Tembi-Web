import { FoodCelebrateResponse } from "../response/food-celebrate-response";
import FoodItem from "./food-item.entity";

type FoodCelebrateData = {
  id: number;
  name_ind: string;
  name_eng: string;
  description_ind: string;
  description_eng: string;
  image: string;
  items: FoodItem[];
};

export default class FoodCelebrate {
  id: number;
  name_ind: string;
  name_eng: string;
  description_ind: string;
  description_eng: string;
  image: string;
  items: FoodItem[];

  constructor(data: FoodCelebrateData) {
    this.id = data.id;
    this.name_ind = data.name_ind;
    this.name_eng = data.name_eng;
    this.description_ind = data.description_ind;
    this.description_eng = data.description_eng;
    this.image = data.image;
    this.items = data.items;
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  hasImage(): boolean {
    return !!this.image && this.image.trim() !== "";
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }

  getTotalItems(): number {
    return this.items.length;
  }

  getItems(): FoodItem[] {
    return this.items;
  }

  static fromResponse(response: FoodCelebrateResponse): FoodCelebrate {
    return new FoodCelebrate({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      image: response.image,
      items: response.items.map((item) => FoodItem.fromResponse(item)),
    });
  }
}