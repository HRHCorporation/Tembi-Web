import BaseFailure from "./base.failure";

export type NetworkFailureData = {
  url?: string;
  method?: string;
  statusCode?: number;
  statusText?: string;
};

export default class NetworkFailure extends BaseFailure<NetworkFailureData> {
  constructor(
    data: NetworkFailureData = {},
    message?: string,
    statusCode?: number
  ) {
    super(
      data,
      message || NetworkFailure.getDefaultMessage(data),
      statusCode || data.statusCode
    );
  }

  private static getDefaultMessage(data: NetworkFailureData): string {
    if (data.statusCode) {
      return `Network request failed with status ${data.statusCode}: ${data.statusText || 'Unknown error'}`;
    }
    return 'Network request failed';
  }

  public getUserMessage(): string {
    if (this.statusCode === 404) {
      return 'The requested resource was not found.';
    }
    if (this.statusCode === 500) {
      return 'Server error occurred. Please try again later.';
    }
    if (this.statusCode === 503) {
      return 'Service temporarily unavailable. Please try again later.';
    }
    return 'Unable to connect to the server. Please check your internet connection.';
  }
}