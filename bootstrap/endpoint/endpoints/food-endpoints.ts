import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class FoodEndpoint extends Endpoint {
  private readonly BASE_PATH = 'food';

  get celebrate() {
    return this.buildEndpoint(`${this.BASE_PATH}/celebrate`);
  }

  get highlight() {
    return this.buildEndpoint(`${this.BASE_PATH}/food-highlight`);
  }

  get food() {
    return this.buildEndpoint(`${this.BASE_PATH}/catering`);
  }

  foodBySlug(slug: string) {
    return this.buildEndpoint(`${this.BASE_PATH}/${slug}`);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
  }
}