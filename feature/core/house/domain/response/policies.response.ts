import { CancellationPolicyResponse } from "./cancellation.response";
import { CheckinCheckoutPolicyResponse } from "./checkin-checkout.response";

export type PoliciesResponse = {
  CHECKIN_CHECKOUT: CheckinCheckoutPolicyResponse;
  CANCELLATION_POLICY: CancellationPolicyResponse;
}