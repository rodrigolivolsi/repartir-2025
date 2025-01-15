import { expectTypeOf,expect, vi } from 'vitest';
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
  }) as const satisfies Lineup[0];

  testAssembly = TestAssemblyFactory(lineup, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });
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
  }) as const satisfies Lineup[0];

  const testAssemblySinAdapter = TestAssemblyFactory(lineupSinMetodoAdapter, {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });
  const texto = "hice algo sin adapter";
  const resultado = testAssemblySinAdapter.testDriver.hacerAlgoSinAdapter(texto);

  expect(resultado).toBe(texto);
});

test("cuando se invoca un metodo en el driver que retorna un string, retorna un string del método correspondiente del adapter", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgoQueRetornaUnString");

  const result = testAssembly.testDriver.hacerAlgoQueRetornaUnString();

  expect(spy.mock.results[0].value).toBe(result);
});

test("los valores de retorno del driver y adapter coinciden", () => {
  const returnDriver = expectTypeOf(testDriver.hacerAlgoQueRetornaUnString).returns;
  const returnAdapter = expectTypeOf(testAdapter.hacerAlgoQueRetornaUnString).returns;

  expectTypeOf(returnDriver).toEqualTypeOf(returnAdapter);
});

test("los tipos del lineup son correctos", () => {
  expectTypeOf(lineup).toHaveProperty("drivers");
  expectTypeOf(lineup).toHaveProperty("adapters");

  expectTypeOf(lineup.drivers[0]).toMatchTypeOf({
    name: expect.any(String),
    constructor: expect.any(Function),
  });
});

test("los métodos pueden ser lambda o no lambda", () => {//

  const spyLambda = vi.spyOn(testAdapter, "haceralgoLambda");
  const spyNoLambda = vi.spyOn(testAdapter, "haceralgoNoLambda");

  expect(() => testAssembly.testDriver.haceralgoLambda()).not.toThrow();
  expect(() => testAssembly.testDriver.haceralgoNoLambda()).not.toThrow();

  expect(() => spyLambda.mock.calls.forEach(call => call)).not.toThrow();
  expect(() => spyNoLambda.mock.calls.forEach(call => call)).not.toThrow();
});

test("Un método asincrónico debe necesitar await para obtener su valor", async () => {
  const spy = vi.spyOn(testAdapter, "hacerAlgoAsincrono");

  const resultadoDriverSinAwait = testAssembly.testDriver.hacerAlgoAsincrono();
  expect(resultadoDriverSinAwait).toBeInstanceOf(Promise);

  const resultadoDriverConAwait = await testAssembly.testDriver.hacerAlgoAsincrono();
  expect(resultadoDriverConAwait).toBe("resultado asincrónico");

  expect(spy.mock.results[0]?.value).toBeInstanceOf(Promise);
  expect(await spy.mock.results[0]?.value).toBe("resultado asincrónico");
});

