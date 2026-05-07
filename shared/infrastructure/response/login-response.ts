import AuthProfile from "@/feature/generic/auth/domain/entity/auth-profile.entity";
import AuthToken from "@/feature/generic/auth/domain/entity/auth-token.entity";

export default class LoginResponse {
  readonly user: AuthProfile;
  readonly token: AuthToken;

  constructor(params: {
    user: AuthProfile;
    token: AuthToken;
  }) {
    this.user = params.user;
    this.token = params.token;
  }

  static fromJson(json: any): LoginResponse {
    return new LoginResponse({
      user: AuthProfile.fromJson(json.user),
      token: AuthToken.fromJson(json.token),
    })
  }
}