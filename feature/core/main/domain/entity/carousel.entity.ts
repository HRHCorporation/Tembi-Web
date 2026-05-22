import { CarouselResponse } from "../response/carousel.response";

type CarouselData = {
  id: number;
  image?: string;
  title_ind?: string;
  title_eng?: string;
  is_active?: number;
}

export default class Carousel {
  id: number;
  image?: string;
  title_ind?: string;
  title_eng?: string;
  is_active?: number;

  constructor({ id, image, title_ind, title_eng, is_active }: CarouselData) {
    this.id = id;
    this.image = image;
    this.title_ind = title_ind;
    this.title_eng = title_eng;
    this.is_active = is_active;
  }

  getTitle(lang: "id" | "en"): string | undefined {
    return lang === "id" ? this.title_ind : this.title_eng;
  }

  getIsActive(): boolean {
    return this.is_active === 1;
  }

  static fromResponse(response: CarouselResponse): Carousel {
    return new Carousel({
      id: response.id,
      image: response.image,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      is_active: response.is_active
    });
  }
}