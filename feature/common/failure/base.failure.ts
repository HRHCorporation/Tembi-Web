export default abstract class BaseFailure<T = unknown> extends Error {
  public readonly data: T;
  public readonly timestamp: Date;
  public readonly statusCode?: number;

  constructor(data: T, message?: string, statusCode?: number) {
    super(message || 'An error occurred');
    this.name = this.constructor.name;
    this.data = data;
    this.timestamp = new Date();
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getMessage(): string {
    return this.message;
  }

  public getData(): T {
    return this.data;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getStatusCode(): number | undefined {
    return this.statusCode;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp.toISOString(),
      statusCode: this.statusCode,
      stack: this.stack,
    };
  }

  
  public getUserMessage(): string {
    return this.message;
  }
}