import { expect } from "@jest/globals";
import type {MatcherFunction} from 'expect';

// jest extensions
const AdditionalMatchers = {
  fail: (
      (item: any, message: string) => ({ pass: false, message: () => `${JSON.stringify(item) + '\n' ?? ''}${message}` })
    ) as MatcherFunction<[message: string]>,
  pass: (
      (item: any, message: string) => ({ pass: true,  message: () => `${JSON.stringify(item) + '\n' ?? ''}${message}` })
    ) as MatcherFunction<[message: string]>,
}

expect.extend(AdditionalMatchers);

declare module 'expect' {
  interface Matchers<R> {
    fail(message: string): R;
    pass(message: string): R;
  }

  interface AsymmetricMatchers {
    fail(message: string): void;
    pass(message: string): void;
  }
}