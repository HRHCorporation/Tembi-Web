import BaseFailure from "@/feature/common/failure/base.failure";

export default class AuthCachedTokenFailure extends BaseFailure<
  { reason: unknown } | undefined
> {
  constructor(metadata?: { reason: unknown }) {
    super("auth-cached-token", "common", metadata);
  }
}