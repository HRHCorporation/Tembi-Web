import BaseFailure from "./base.failure";

export function failureOr(
  reason: unknown,
  failure: BaseFailure<any>,
): BaseFailure<any> {
  if (reason instanceof BaseFailure) {
    return reason;
  }
  return failure;
}

export function failureOrCurry(failure: BaseFailure<any>) {
  return (reason: unknown): BaseFailure<any> => {
    if (reason instanceof BaseFailure) {
      return reason;
    }
    return failure;
  };
}
export function mapToFailureFrom<IfType extends BaseFailure<any>>(
  f: (t: IfType) => BaseFailure<any>,
  ctor: new (...args: never[]) => IfType,
): (t: BaseFailure<any>) => BaseFailure<any> {
  return mapIfInstance<IfType, BaseFailure<any>>(f, ctor);
}

export function mapIfInstance<IfType, Response>(
  f: (t: IfType) => Response,
  ctor: new (...args: never[]) => IfType,
) {
  return (t: IfType | Response) => {
    if (t instanceof ctor) {
      return f(t);
    }
    return t;
  };
}

export function mapIfNotInstance<IfType, Response>(
  f: (t: IfType) => Response,
  ctor: new (...args: never[]) => IfType,
) {
  return (t: IfType | Response) => {
    if (t! instanceof ctor) {
      return f(t);
    }
    return t;
  };
}