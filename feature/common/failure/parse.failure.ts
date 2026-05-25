import BaseFailure from "./base.failure";

export type ParseFailureData = {
  input?: unknown;
  expectedType?: string;
  actualType?: string;
};

export default class ParseFailure extends BaseFailure<ParseFailureData> {
  constructor(data: ParseFailureData = {}, message?: string) {
    super(
      data,
      message || ParseFailure.getDefaultMessage(data)
    );
  }

  private static getDefaultMessage(data: ParseFailureData): string {
    if (data.expectedType && data.actualType) {
      return `Failed to parse data: expected ${data.expectedType}, got ${data.actualType}`;
    }
    return 'Failed to parse data';
  }

  public getUserMessage(): string {
    return 'Received invalid data from server. Please try again.';
  }
}