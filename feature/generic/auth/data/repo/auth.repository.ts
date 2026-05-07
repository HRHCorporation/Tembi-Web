import { cookies } from "next/headers";
import { pipe } from "fp-ts/lib/function";
import { tryCatch } from "fp-ts/lib/TaskEither";
import ApiTask from "@/feature/common/data/api-task";
import AuthRepo from "../../domain/i-repo/auth.repository";
import AuthProfile from "../../domain/entity/auth-profile.entity";
import AuthToken from "../../domain/entity/auth-token.entity";
import LoginResponse from "@/shared/infrastructure/response/login-response";
import serverConfigs from "@/bootstrap/configs/server-configs";

export default class AuthSanctumRepo implements AuthRepo {
  login(
    email: string,
    password: string,
  ): ApiTask<LoginResponse> {
    return pipe(
      tryCatch(async () => {
        const response = await fetch(
          `${serverConfigs.env.backendApi}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const json = await response.json();

        const token = new AuthToken({
          accessToken: json.content.token,
        });

        const profile = AuthProfile.fromJson(
          json.content.user,
        );

        await this.storeTokenToCookie(token);
        await this.storeProfileToCookie(profile);

        return new LoginResponse({
          token,
          user: profile,
        });
      }, this.failureHandler),
    );
  }

  getMe(): ApiTask<AuthProfile> {
    return pipe(
      tryCatch(async () => {
        const token = await this.getRawToken();

        const response = await fetch(
          `${serverConfigs.env.backendApi}/me`,
          {
            headers: {
              Authorization: token.getTokenForHeader(),
            },
          },
        );

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const json = await response.json();

        return AuthProfile.fromJson(json.content.user);
      }, this.failureHandler),
    );
  }

  logout(): ApiTask<boolean> {
    return pipe(
      tryCatch(async () => {
        const cookie = await cookies();

        cookie.delete(serverConfigs.cookies.authToken);
        cookie.delete(serverConfigs.cookies.authProfile);

        return true;
      }, this.failureHandler),
    );
  }

  getCachedToken(): ApiTask<AuthToken> {
    return pipe(
      tryCatch(async () => {
        return this.getRawToken();
      }, this.failureHandler),
    );
  }

  getCachedProfile(): ApiTask<AuthProfile> {
    return pipe(
      tryCatch(async () => {
        const cookieProfile = (await cookies()).get(
          serverConfigs.cookies.authProfile,
        )?.value;

        if (!cookieProfile) {
          throw new Error("Profile not found");
        }

        return AuthProfile.fromJson(
          JSON.parse(cookieProfile),
        );
      }, this.failureHandler),
    );
  }

  private async getRawToken() {
    const cookieToken = (await cookies()).get(
      serverConfigs.cookies.authToken,
    )?.value;

    if (!cookieToken) {
      throw new Error("Token not found");
    }

    return new AuthToken(JSON.parse(cookieToken));
  }

  private async storeTokenToCookie(
    token: AuthToken,
  ) {
    (await cookies()).set({
      name: serverConfigs.cookies.authToken,
      value: JSON.stringify(token),
      httpOnly: true,
      sameSite: "lax",
    });
  }

  private async storeProfileToCookie(
    profile: AuthProfile,
  ) {
    (await cookies()).set({
      name: serverConfigs.cookies.authProfile,
      value: JSON.stringify(profile),
    });
  }

  private failureHandler(reason: unknown): any {
    return reason;
  }
}