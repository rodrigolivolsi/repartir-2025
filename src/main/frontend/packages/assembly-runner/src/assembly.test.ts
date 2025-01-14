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
  const testADapter =new TestAdapter();
  const spy = vi.spyOn(testADapter, "hacerAlgo");

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
          constructor: () => testADapter,
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

test("cuando se invoca un metodo en el driver con parametros, se llama el método correspondiente del adapter con parametros", async () => {
  const testADapter =new TestAdapter();
  const spy = vi.spyOn(testADapter, "hacerAlgoConParametros");
  const parametro1 ="hola mundo";
  const parametro2 = 1;

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
          constructor: () => testADapter,
        },
      ],
    })
  ] as const satisfies Lineup;

  const testAssembly = TestAssemblyFactory(lineup[0], {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });

  testAssembly.testDriver.hacerAlgoConParametros(parametro1,parametro2);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(parametro1,parametro2);
})

test("puede no existir método de adapter que se corresponda con el del driver", async () => {
  const testAdapterVacio = {};

  const lineup = [
    createAssembly("assembly-sin-metodo-adapter", {
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
    }),
  ] as const satisfies Lineup;


  const testAssembly = TestAssemblyFactory(lineup[0], {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });

  const resultado = testAssembly.testDriver.hacerAlgoSinAdapter();

  expect(resultado).toBeUndefined(); 
  expect(() => testAssembly.testDriver.hacerAlgoSinAdapter()).not.toThrow();
});

test("cuando se invoca un metodo en el driver que retorna un string, retorna un string ddel método correspondiente del adapter", async () => {
  const testADapter =new TestAdapter();
  const testDriver = new TestDriver();
  
  const spy = vi.spyOn(testADapter, "hacerAlgoQueRetornaUnString");

  const lineup = [
    createAssembly("assembly-con-adapter", {
      drivers: [
        {
          name: "testDriver",
          constructor: () =>
            testDriver,
        },
      ],
      adapters: [
        {
          name: "testAdapter",
          constructor: () => testADapter,
        },
      ],
    })
  ] as const satisfies Lineup;

  const testAssembly = TestAssemblyFactory(lineup[0], {
    adaptersConstructorArgs: [],
    driversConstructorArgs: [],
  });

  const result = testAssembly.testDriver.hacerAlgoQueRetornaUnString();
  
  expect(spy.mock.results[0].value).toBe(result);

})