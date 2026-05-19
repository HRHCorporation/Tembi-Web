import BaseFailure from "@/feature/common/failure/base.failure";

export class FoodFetchFailure extends BaseFailure<
  { type: string; endpoint: string; }> {
  constructor(type: string, endpoint: string, message?: string) {
    super({
      type,
      endpoint,
    });
    this.message = message || `Failed to fetch ${type} from ${endpoint}`;
  }
}

export class FoodParseFailure extends BaseFailure<
  { type: string; }> {
  constructor(type: string, message?: string) {
    super({
      type,
    });
    this.message = message || `Failed to parse ${type} data`;
  }
}