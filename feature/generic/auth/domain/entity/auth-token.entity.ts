export type AuthTokenParams = {
  accessToken: string;
  tokentype?: string;
};

export default class AuthToken {
  readonly accessToken: string;
  readonly tokentype: string;

  constructor(params: AuthTokenParams) {
    this.accessToken = params.accessToken;
    this.tokentype = params.tokentype ?? "Bearer";
  }

  getTokenForHeader() {
    return `${this.tokentype} ${this.accessToken}`;
  }

  static fromJson(token: string): AuthToken {
    return new AuthToken({
      accessToken: token,
    });
  }
}