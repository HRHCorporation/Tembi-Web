declare const _: unique symbol;

type Forbidden = { [_]: typeof _ };

export type NoOverride<T = void> = T & Forbidden;