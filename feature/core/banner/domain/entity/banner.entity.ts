import { BannerResponse } from "../response/banner-response";

type BannerData = {
  id: number;
  image?: string;
  title_ind?: string;
  title_eng?: string;
  subtitle_ind?: string;
  subtitle_eng?: string;
  description_ind?: string;
  description_eng?: string;
}

export default class Banner {
  id: number;
  image: string;
  title_ind: string;
  title_eng: string;
  subtitle_ind?: string;
  subtitle_eng?: string;
  description_ind: string;
  description_eng: string;

  constructor(data: BannerData) {
    this.id = data.id;
    this.image = data.image || "";
    this.title_ind = data.title_ind || "";
    this.title_eng = data.title_eng || "";
    this.subtitle_ind = data.subtitle_ind;
    this.subtitle_eng = data.subtitle_eng;
    this.description_ind = data.description_ind || "";
    this.description_eng = data.description_eng || "";
  }

  getTitle(language: "id" | "en"): string {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getSubtitle(language: "id" | "en"): string {
    return language === "id" ? this.subtitle_ind || "" : this.subtitle_eng || "";
  }

  getDescription(language: "id" | "en"): string {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  static fromResponse(response: BannerResponse): Banner {
    return new Banner({
      id: response.id,
      image: response.image,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      subtitle_ind: response.subtitle_ind,
      subtitle_eng: response.subtitle_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng
    });
  }
}