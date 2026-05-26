import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class CollectionEndpoint extends Endpoint {
  private collectionEndpoint: string;

  get collection() {
    return this.buildEndpoint(this.collectionEndpoint);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
    this.collectionEndpoint = 'collection'
  }
}