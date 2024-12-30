import { expectTypeOf } from 'vitest';

test('my types work properly', () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };

  expectTypeOf(sum).parameters.toMatchTypeOf<number[]>();
  expectTypeOf(sum).parameters.toEqualTypeOf<[number, number]>();
});
