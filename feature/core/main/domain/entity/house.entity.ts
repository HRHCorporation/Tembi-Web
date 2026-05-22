import AllGaleries from "@/feature/core/venue/domain/entity/all-galleries.entity";
import { HouseResponse } from "../response/house.response";

type HouseData = {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  slug?: string;
  is_recommendation?: number;
  galleries?: AllGaleries[];
}

export default class House {
  id: number;
  title_ind?: string;
  title_eng?: string;
  description_ind?: string;
  description_eng?: string;
  slug?: string;
  is_recommendation?: number;
  galleries?: AllGaleries[];

  constructor({ id, title_ind, title_eng, description_ind, description_eng, slug, is_recommendation, galleries }: HouseData) {
    this.id = id;
    this.title_ind = title_ind;
    this.title_eng = title_eng;
    this.description_ind = description_ind;
    this.description_eng = description_eng;
    this.slug = slug;
    this.is_recommendation = is_recommendation;
    this.galleries = galleries;
  }

  getTitle(language: "id" | "en"): string | undefined {
    return language === "id" ? this.title_ind : this.title_eng;
  }

  getDescription(language: "id" | "en"): string | undefined {
    return language === "id" ? this.description_ind : this.description_eng;
  }

  getIsRecommendation(): boolean {
    return this.is_recommendation === 1;
  }

  getGalleries(): AllGaleries[] | undefined {
    return this.galleries;
  }

  static fromResponse(response: HouseResponse): House {
    const galleries = response.galleries?.map(gallery => new AllGaleries({
      id: gallery.id,
      image: gallery.image,
      isBanner: gallery.is_banner
    }));
    return new House({
      id: response.id,
      title_ind: response.title_ind,
      title_eng: response.title_eng,
      description_ind: response.description_ind,
      description_eng: response.description_eng,
      slug: response.slug,
      is_recommendation: response.is_recommendation,
      galleries: galleries
    });
  }
}