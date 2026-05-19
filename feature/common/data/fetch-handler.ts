import { pipe } from "fp-ts/lib/function";
import ApiTask from "./api-task";
import { tryCatch } from "fp-ts/lib/TaskEither"
import { failureOrCurry } from "../failure/failure-helpers";
import NetworkFailure from "../failure/network.failure";


export type FetchOptions<
  BODY extends Record<string, unknown> | string | string[] | undefined =
  undefined,
> = {
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  cache?: RequestCache;
  header?: HeadersInit;
  body?: BODY;
};

export default class FetchHandler {
  fetchWithoutAuthWithRepsonseStatus<
    BODY extends Record<string, unknown> | undefined = undefined,
  >(options: FetchOptions<BODY>): ApiTask<Response> {
    return pipe(
      tryCatch(
        async () =>
          fetch(options.endpoint, {
            method: options.method,
            body: JSON.stringify(options.body),
          }),
        failureOrCurry(new NetworkFailure()),
      ),
    );
  }
}