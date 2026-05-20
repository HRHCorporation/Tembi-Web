import serverConfigs from "@/bootstrap/configs/server-configs";
import Endpoint from "../endpoint"
import publicConfigs from "@/bootstrap/configs/public-configs";

export default class BlogEndpoint extends Endpoint {
  private blogEndpoint: string;

  get blog() {
    return this.buildEndpoint(this.blogEndpoint)
  }

  blogBySlug(slug: string) {
    return this.buildEndpoint(`${this.blogEndpoint}/${slug}`)
  }

  constructor() {
    super({
      baseUrl: publicConfigs.api.baseUrl,
    })
    this.blogEndpoint = 'blogs'
  }
}