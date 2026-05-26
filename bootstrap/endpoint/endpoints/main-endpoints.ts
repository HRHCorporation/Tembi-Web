import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class MainEndpoint extends Endpoint {
  private readonly BASE_PATH = 'main';

  get carousel() {
    return this.buildEndpoint(`${this.BASE_PATH}/carousel`);
  }

  get collection() {
    return this.buildEndpoint(`${this.BASE_PATH}/collection`);
  }

  get house() {
    return this.buildEndpoint(`${this.BASE_PATH}/house`);
  }

  get venue() {
    return this.buildEndpoint(`${this.BASE_PATH}/vanue`);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
  }
}