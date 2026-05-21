import { PreviewImageResponse } from "../response/preview-images.response";

export default class PreviewImage {
  id: number;
  image?: string;
  isBanner?: boolean;

  constructor({ id, image, isBanner }: { id: number; image?: string; isBanner?: boolean }) {
    this.id = id;
    this.image = image;
    this.isBanner = isBanner;
  }

  hasImage(): boolean {
    return !!this.image && this.image.trim() !== "";
  }

  static fromResponse(response: PreviewImageResponse): PreviewImage {
    return new PreviewImage({
      id: response.id,
      image: response.image,
      isBanner: response.is_banner
    });
  }
}