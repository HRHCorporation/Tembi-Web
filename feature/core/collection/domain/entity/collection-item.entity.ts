import { CollectionItemResponse } from "../response/collection-item-response";

type CollectionItemData = {
  id: number;
  image?: string;
  name_eng?: string;
  name_ind?: string;
  description_eng?: string;
  description_ind?: string;
};

export default class CollectionItem {
  id: number;
  image: string;
  name_eng: string;
  name_ind: string;
  description_eng: string;
  description_ind: string;

  constructor(data: CollectionItemData) {
    this.id = data.id;
    this.image = data.image || "";
    this.name_eng = data.name_eng || "";
    this.name_ind = data.name_ind || "";
    this.description_eng = data.description_eng || "";
    this.description_ind = data.description_ind || "";
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

  static fromResponse(response: CollectionItemResponse): CollectionItem {
    return new CollectionItem({
      id: response.id,
      image: response.image,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      description_eng: response.description_eng,
      description_ind: response.description_ind,
    });
  }
}