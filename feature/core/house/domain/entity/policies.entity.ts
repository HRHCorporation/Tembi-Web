import { PoliciesResponse } from "../response/policies.response";
import CancellationPolicy from "./cancellation.entity";
import CheckinCheckoutPolicy from "./checkin-checkout.entity"

type PoliciesData = {
  CHECKIN_CHECKOUT: CheckinCheckoutPolicy[];
  CANCELLATION_POLICY: CancellationPolicy[];
}

export default class Policies {
  CHECKIN_CHECKOUT: CheckinCheckoutPolicy[];
  CANCELLATION_POLICY: CancellationPolicy[];

  constructor(data: PoliciesData) {
    this.CHECKIN_CHECKOUT = data.CHECKIN_CHECKOUT;
    this.CANCELLATION_POLICY = data.CANCELLATION_POLICY;
  }

  getCheckinCheckoutPolicy(): CheckinCheckoutPolicy[] {
    return this.CHECKIN_CHECKOUT || [];
  }

  getCancellationPolicy(): CancellationPolicy[] {
    return this.CANCELLATION_POLICY || [];
  }

  static fromResponse(response: PoliciesResponse): Policies {
    return new Policies({
      CHECKIN_CHECKOUT: [CheckinCheckoutPolicy.fromResponse(response.CHECKIN_CHECKOUT)],
      CANCELLATION_POLICY: [CancellationPolicy.fromResponse(response.CANCELLATION_POLICY)]
    });
  }
}