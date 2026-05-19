import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class BannerEndpoint extends Endpoint {
  private readonly BASE_PATH = 'master/banner';

  get collection() {
    return this.buildEndpoint(`${this.BASE_PATH}/collection`);
  }

  get food() {
    return this.buildEndpoint(`${this.BASE_PATH}/food`);
  }

  get history() {
    return this.buildEndpoint(`${this.BASE_PATH}/history`);
  }

  get room() {
    return this.buildEndpoint(`${this.BASE_PATH}/room`);
  }

  get venue() {
    return this.buildEndpoint(`${this.BASE_PATH}/venue`);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
  }
}