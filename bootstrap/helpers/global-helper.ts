import { constructor } from "tsyringe/dist/typings/types";

export const isServer = typeof window === "undefined";

export function isClass(fn: any): fn is constructor<unknown> {
  return typeof fn === "function" && /^(class|function [A-Z])/.test(fn);
}