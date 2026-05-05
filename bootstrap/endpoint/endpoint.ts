export default class Endpoint {
  protected baseUrl: string;
  protected apiVersion: string;

  constructor({
    baseUrl,
    apiVersion,
  }: {
    baseUrl: string;
    apiVersion: string;
  }) {
    this.apiVersion = apiVersion;
    this.baseUrl = baseUrl;
  }

  static compose(uris: string[]) {
    return Endpoint.sanitizeURL(uris.join("/"));
  }

  protected buildEndpoint(endpoint: string) {
    return Endpoint.sanitizeURL(
      `${this.baseUrl}/${this.apiVersion}/${endpoint}`,
    );
  }

  static sanitizeURL(url: string) {
    return url.replaceAll(/(?<!:)\/\//g, "/");
  }

}