import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint";

export default class BackendEndpoint extends Endpoint {
  private loginEndpoint: string;

  get login() {
    return this.buildEndpoint(this.loginEndpoint);
  }

  constructor() {
    super({
      apiVersion: "v1",
      baseUrl: serverConfigs.env.backendApi.url,
    });
    this.loginEndpoint = "auth/login";
  }
}