import { expectTypeOf,expect, vi } from 'vitest';
import { TestDriver } from './test-driver.helper';
import { TestAdapter } from './test-adapter.helper';
import { createAssembly, Lineup, TestAssemblyFactory } from './assembly';

let testAdapter: TestAdapter;
let testDriver: TestDriver;
let lineup: Lineup[0];
let testAssembly: ReturnType<typeof TestAssemblyFactory>;

beforeEach(() => {
  testAdapter = new TestAdapter();
  testDriver = new TestDriver();

  lineup = createAssembly("assembly-con-adapter", {
    drivers: [
      {
        name: "testDriver",
        constructor: () => testDriver,
      },
    ],
    adapters: [
      {
        name: "testAdapter",
        constructor: () => testAdapter,
      },
    ],
  }) as const satisfies Lineup[0];

  testAssembly = TestAssemblyFactory(lineup, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });
});

test('my types work properly1', () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };

  expectTypeOf(sum).parameters.toMatchTypeOf<number[]>();
  expectTypeOf(sum).parameters.toEqualTypeOf<[number, number, number, number]>();
});

test("cuando se invoca un metodo en el driver, se llama el método correspondiente del adapter", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgo");

  testAssembly.testDriver.hacerAlgo();

  expect(spy).toHaveBeenCalled();
});

test("cuando se invoca un metodo en el driver con parametros, se llama el método correspondiente del adapter con parametros", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgoConParametros");
  const parametro1 = "hola mundo";
  const parametro2 = 1;

  testAssembly.testDriver.hacerAlgoConParametros(parametro1, parametro2);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(parametro1, parametro2);
});

test("puede no existir método de adapter que se corresponda con el del driver", async () => {
  const testAdapterVacio = {};

  const lineupSinMetodoAdapter = createAssembly("assembly-sin-metodo-adapter", {
    drivers: [
      {
        name: "testDriver",
        constructor: () => new TestDriver(),
      },
    ],
    adapters: [
      {
        name: "testAdapter",
        constructor: () => testAdapterVacio,
      },
    ],
  }) as const satisfies Lineup[0];

  const testAssemblySinAdapter = TestAssemblyFactory(lineupSinMetodoAdapter, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });

  const resultado = testAssemblySinAdapter.testDriver.hacerAlgoSinAdapter();

  expect(resultado).toBeUndefined();
  expect(() => testAssemblySinAdapter.testDriver.hacerAlgoSinAdapter()).not.toThrow();
});

test("cuando se invoca un metodo en el driver que retorna un string, retorna un string del método correspondiente del adapter", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgoQueRetornaUnString");

  const result = testAssembly.testDriver.hacerAlgoQueRetornaUnString();

  expect(spy.mock.results[0].value).toBe(result);
});
