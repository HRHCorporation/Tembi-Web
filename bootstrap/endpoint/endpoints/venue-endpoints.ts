import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class VenueEndpoint extends Endpoint {
  private readonly BASE_PATH = 'vanue';

  get galleryVenue() {
    return this.buildEndpoint(`${this.BASE_PATH}/galery-vanue`);
  }

  get venue() {
    return this.buildEndpoint(`${this.BASE_PATH}/list-vanue`);
  }

  venueBySlug(slug: string) {
    return this.buildEndpoint(`${this.BASE_PATH}/${slug}`);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
  }
}