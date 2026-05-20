import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class HouseEndpoint extends Endpoint {
  private readonly BASE_PATH = 'room';

  get recommendation() {
    return this.buildEndpoint(`${this.BASE_PATH}/list-room-recomendation`);
  }

  get rooms() {
    return this.buildEndpoint(`${this.BASE_PATH}/list-room`);
  }

  roomBySlug(slug: string) {
    return this.buildEndpoint(`${this.BASE_PATH}/${slug}`);
  }

  get service(){
    return this.buildEndpoint(`${this.BASE_PATH}/services`);
  }

  get addService() {
    return this.buildEndpoint(`${this.BASE_PATH}/services-add`);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
  }
}