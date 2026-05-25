import { PoliciesResponse } from "../response/policies.response";
import CancellationPolicy from "./cancellation.entity";
import CheckinCheckoutPolicy from "./checkin-checkout.entity";

type PoliciesData = {
  CHECKIN_CHECKOUT: CheckinCheckoutPolicy[];
  CANCELLATION_POLICY: CancellationPolicy[];
};

export default class Policies {
  CHECKIN_CHECKOUT: CheckinCheckoutPolicy[];
  CANCELLATION_POLICY: CancellationPolicy[];

  constructor(data: PoliciesData) {
    this.CHECKIN_CHECKOUT = data.CHECKIN_CHECKOUT || [];
    this.CANCELLATION_POLICY = data.CANCELLATION_POLICY || [];
  }

  getCheckinCheckoutPolicy(): CheckinCheckoutPolicy[] {
    return this.CHECKIN_CHECKOUT;
  }

  getCancellationPolicy(): CancellationPolicy[] {
    return this.CANCELLATION_POLICY;
  }

  hasCheckinCheckoutPolicy(): boolean {
    return this.CHECKIN_CHECKOUT.length > 0;
  }

  hasCancellationPolicy(): boolean {
    return this.CANCELLATION_POLICY.length > 0;
  }

  static fromResponse(response: PoliciesResponse): Policies {
    const checkinCheckoutPolicies = response.CHECKIN_CHECKOUT.map((item) =>
      CheckinCheckoutPolicy.fromResponse(item),
    );

    const cancellationPolicies = response.CANCELLATION_POLICY.map((item) =>
      CancellationPolicy.fromResponse(item),
    );

    return new Policies({
      CHECKIN_CHECKOUT: checkinCheckoutPolicies,
      CANCELLATION_POLICY: cancellationPolicies,
    });
  }
}
