import { AllGalleryResponse } from "../response/all-galleries.response";

export default class AllGaleries {
  id: number;
  image?: string;
  isBanner?: number;

  constructor({ id, image, isBanner }: { id: number; image?: string; isBanner?: number }) {
    this.id = id;
    this.image = image;
    this.isBanner = isBanner;
  }

  hasImage(): boolean {
    return !!this.image && this.image.trim() !== "";
  }

  static fromResponse(response: AllGalleryResponse): AllGaleries {
    return new AllGaleries({
      id: response.id,
      image: response.image,
      isBanner: response.is_banner
    });
  }
}