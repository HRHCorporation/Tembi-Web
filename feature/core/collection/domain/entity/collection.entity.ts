import { CollectionResponse } from "../response/collection-response";
import CollectionItem from "./collection-item.entity";

type CollectionData = {
  id: number;
  name_ind?: string;
  name_eng?: string;
  items?: CollectionItem[];
}

export default class Collection {
  id: number;
  name_ind: string;
  name_eng: string;
  items: CollectionItem[];

  constructor(data: CollectionData) {
    this.id = data.id;
    this.name_ind = data.name_ind || "";
    this.name_eng = data.name_eng || "";
    this.items = data.items || [];
  }

  getName(language: "id" | "en"): string {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }

  getTotalItems(): number {
    return this.items.length;
  }

  getItems(): CollectionItem[] {
    return this.items;
  }

  static fromResponse(response: CollectionResponse): Collection {
    const items = response.items
      ? response.items.map((item) => CollectionItem.fromResponse(item))
      : [];
    return new Collection({
      id: response.id,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      items: items,
    });
  }
}