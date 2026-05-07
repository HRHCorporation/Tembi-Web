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

export default class FetchHandler{
  
}