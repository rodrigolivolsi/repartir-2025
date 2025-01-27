import { expectTypeOf,expect, vi, test } from 'vitest';
import { TestDriver } from './test-driver.helper';
import { TestAdapter } from './test-adapter.helper';
import { createAssembly, Lineup, TestAssemblyFactory } from './assembly';

let testAdapter: TestAdapter;
let testDriver: TestDriver;
let lineup: Lineup[0];
let testAssembly: ReturnType<typeof TestAssemblyFactory>;

beforeEach(() => {
  testAdapter  = new TestAdapter();
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
  })  satisfies Lineup[0];

  testAssembly = TestAssemblyFactory(lineup, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });
});

test("cuando se invoca un metodo en el driver, se llama el método correspondiente del adapter", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgo");

  await testAssembly.testDriver.hacerAlgo();

  expect(spy).toHaveBeenCalled();
});

test("cuando se invoca un metodo en el driver con parametros, se llama el método correspondiente del adapter con parametros", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgoConParametros");
  const parametro1 = "hola mundo";
  const parametro2 = 1;

  await testAssembly.testDriver.hacerAlgoConParametros(parametro1, parametro2);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(parametro1, parametro2);
});

test("las firmas de los métodos del adapter son iguales a las del driver", () => {
  const driverMethodSignature = expectTypeOf(testDriver.hacerAlgoConParametros).parameters;
  const adapterMethodSignature = expectTypeOf(testAdapter.hacerAlgoConParametros).parameters;

  expectTypeOf(driverMethodSignature).toEqualTypeOf(adapterMethodSignature);
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
  }) satisfies Lineup[0];

  const testAssemblySinAdapter = TestAssemblyFactory(lineupSinMetodoAdapter, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });
  const texto = "hice algo sin adapter";
  const resultado = await testAssemblySinAdapter.testDriver.hacerAlgoSinAdapter(texto);

  expect(resultado).toBe(texto);
});

test("los tipos del lineup son correctos", () => {
  expectTypeOf(lineup).toHaveProperty("drivers");
  expectTypeOf(lineup).toHaveProperty("adapters");

  expectTypeOf(lineup.drivers[0]).toMatchTypeOf({
    name: expect.any(String),
    constructor: expect.any(Function),
  });
});

test("los métodos pueden ser lambda o no lambda", async () => {
  const resultadoLambda = await testAssembly.testDriver.sumarLambda(2, 3);
  const resultadoNoLambda = await testAssembly.testDriver.sumarNoLambda(2, 3);

  expect(resultadoLambda).toBe(5);
  expect(resultadoNoLambda).toBe(5);
});

test("Un método sincrono debe funcionar sin await", async () => {
  const resultadoDriverSinAwait = testAssembly.testDriver.hacerAlgoSincrono();

  expect( resultadoDriverSinAwait).toBe("resultado sincrónico");
});

test('El tipo del assembly se corresponde con el tipo del driver', () => {
  expectTypeOf(testAssembly['test']).toMatchTypeOf(testDriver);
});

