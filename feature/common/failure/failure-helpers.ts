import BaseFailure from "./base.failure";
import NetworkFailure from "./network.failure";

export function failureOrCurry<T extends BaseFailure<unknown>>(
  defaultFailure: T
): (error: unknown) => T {
  return (error: unknown) => {

    if (error instanceof BaseFailure) {
      return error as T;
    }

    if (error instanceof Error) {
      const failure = Object.create(defaultFailure);
      failure.message = error.message;
      failure.stack = error.stack;
      return failure;
    }

    return defaultFailure;
  };
}


export function toFailure(error: unknown, defaultFailure: BaseFailure<unknown>): BaseFailure<unknown> {
  if (error instanceof BaseFailure) {
    return error;
  }

  if (error instanceof Error) {
    return new NetworkFailure(
      { statusText: error.message },
      error.message
    );
  }

  return defaultFailure;
}


export function isFailureOfType<T extends BaseFailure<unknown>>(
  error: unknown,
  failureType: new (...args: any[]) => T
): error is T {
  return error instanceof failureType;
}


export function getUserMessageFromFailure(failure: BaseFailure<unknown>): string {
  return failure.getUserMessage();
}


export function logFailure(failure: BaseFailure<unknown>): void {
  console.error('[Failure]', {
    name: failure.name,
    message: failure.message,
    data: failure.data,
    timestamp: failure.timestamp,
    statusCode: failure.statusCode,
    stack: failure.stack,
  });
}


export async function createNetworkFailureFromResponse(
  response: Response
): Promise<NetworkFailure> {
  let errorMessage: string;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || response.statusText;
  } catch {
    errorMessage = response.statusText || 'Unknown error';
  }

  return new NetworkFailure(
    {
      url: response.url,
      statusCode: response.status,
      statusText: response.statusText,
    },
    errorMessage,
    response.status
  );
}