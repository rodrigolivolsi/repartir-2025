import { expectTypeOf,expect, vi } from 'vitest';
import { TestDriver } from './test-driver.helper';
import { TestAdapter } from './test-adapter.helper';
import { createAssembly, Lineup, TestAssemblyFactory } from './assembly';

test('my types work properly1', () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };

  expectTypeOf(sum).parameters.toMatchTypeOf<number[]>();
  expectTypeOf(sum).parameters.toEqualTypeOf<[number, number, number, number]>();
});

test("cuando se invoca un metodo en el driver, se llama el método correspondiente del adapter", async () => {

  const spy = vi.spyOn(new TestAdapter(), "hacerAlgo");

  const lineup = [
    createAssembly("assembly-con-adapter", {
      drivers: [
        {
          name: "testDriver",
          constructor: () =>
            new TestDriver(),
        },
      ],
      adapters: [
        {
          name: "testAdapter",
          constructor: () => spy,
        },
      ],
    })
  ] as const satisfies Lineup;

  const testAssembly = TestAssemblyFactory(lineup[0], {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });

  testAssembly.testDriver.hacerAlgo()

  expect(spy).toHaveBeenCalled();
})
