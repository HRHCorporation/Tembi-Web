import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class BackendEndpoint extends Endpoint {
  private loginEndpoint: string;

  get login() {
    return this.buildEndpoint(this.loginEndpoint);
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    });
    this.loginEndpoint = "auth/login";
  }
}