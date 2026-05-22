import { CollectionResponse } from "../response/collection.response";

type CollectionData = {
  id: number;
  image?: string;
  name_ind?: string;
  name_eng?: string;
  description_ind?: string;
  description_eng?: string;
}

export default class Collection {
  id: number;
  image?: string;
  name_ind?: string;
  name_eng?: string;
  description_ind?: string;
  description_eng?: string;

  constructor({ id, image, name_ind, name_eng, description_ind, description_eng }: CollectionData) {
    this.id = id;
    this.image = image;
    this.name_ind = name_ind;
    this.name_eng = name_eng;
    this.description_ind = description_ind;
    this.description_eng = description_eng;
  }

  getName(language: "id" | "en"): string | undefined {
    return language === "id" ? this.name_ind : this.name_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  static fromResponse(response: CollectionResponse): Collection {
    return new Collection({
      id: response.id,
      image: response.image,
      name_ind: response.name_ind,
      name_eng: response.name_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng
    });
  }
}