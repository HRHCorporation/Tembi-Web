export default class Endpoint {
  protected baseUrl: string;

  constructor({
    baseUrl,
  }: {
    baseUrl: string;
  }) {
    this.baseUrl = baseUrl;
  }

  static compose(uris: string[]) {
    return Endpoint.sanitizeURL(uris.join("/"));
  }

  protected buildEndpoint(endpoint: string) {
    return Endpoint.sanitizeURL(
      `${this.baseUrl}/${endpoint}`,
    );
  }

  static sanitizeURL(url: string) {
    return url.replaceAll(/(?<!:)\/\//g, "/");
  }

}