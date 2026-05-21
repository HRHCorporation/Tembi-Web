import { OurMenuResponse } from '../response/our-menu.response';
export default class OurMenu {
  id: number;
  image: string
  name_eng: string;
  name_ind: string
  description_eng: string;
  description_ind: string;

  constructor({ id, image, name_eng, name_ind, description_eng, description_ind }: { id: number; image: string; name_eng: string; name_ind: string; description_eng: string; description_ind: string }) {
    this.id = id;
    this.image = image;
    this.name_eng = name_eng;
    this.name_ind = name_ind;
    this.description_eng = description_eng;
    this.description_ind = description_ind;
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

  static fromResponse(response: OurMenuResponse): OurMenu {
    return new OurMenu({
      id: response.id,
      image: response.image,
      name_eng: response.name_eng,
      name_ind: response.name_ind,
      description_eng: response.description_eng,
      description_ind: response.description_ind
    });
  }
}