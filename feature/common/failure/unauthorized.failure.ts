import BaseFailure from "./base.failure";

export type UnauthorizedFailureData = {
  reason?: 'missing_token' | 'invalid_token' | 'expired_token' | 'insufficient_permissions';
  requiredPermission?: string;
};

export default class UnauthorizedFailure extends BaseFailure<UnauthorizedFailureData> {
  constructor(data: UnauthorizedFailureData = {}, message?: string) {
    super(
      data,
      message || UnauthorizedFailure.getDefaultMessage(data),
      401
    );
  }

  private static getDefaultMessage(data: UnauthorizedFailureData): string {
    switch (data.reason) {
      case 'missing_token':
        return 'Authentication token is missing';
      case 'invalid_token':
        return 'Authentication token is invalid';
      case 'expired_token':
        return 'Authentication token has expired';
      case 'insufficient_permissions':
        return `Insufficient permissions${data.requiredPermission ? `: ${data.requiredPermission} required` : ''}`;
      default:
        return 'Unauthorized access';
    }
  }

  public getUserMessage(): string {
    if (this.data.reason === 'expired_token') {
      return 'Your session has expired. Please log in again.';
    }
    return 'You are not authorized to perform this action.';
  }
}