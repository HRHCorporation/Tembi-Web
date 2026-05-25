export default class VenueGallery {
  images: string[];

  constructor(images: string[]) {
    this.images = images;
  }

  static fromResponse(response: string[]): VenueGallery {
    return new VenueGallery(response);
  }

  getImages(): string[] {
    return this.images;
  }

  hasImages(): boolean {
    return this.images.length > 0;
  }
}