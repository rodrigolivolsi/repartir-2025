class AssemblyRunner<
  TAssembly extends Assembly,
  TAdapter extends Record<string | symbol, unknown> = Adapter<TAssembly>,
  TDriver extends Record<string | symbol, unknown> = Driver<TAssembly>,
  TDriverName = DriverName<TAssembly>
> {
  constructor(
    private adapters: TAdapter[],
    drivers: {
      name: TDriverName;
      driver: TDriver;
    }[]
  ) {
    drivers.forEach(({ name, driver }) => {
      this.agregarDriver(name, driver);
    });
  }

  private agregarDriver(driverName: TDriverName, driver: TDriver) {
    let anyObj = this as any;
    anyObj[driverName] = this.wrapDriver(driver, this.adapters);
  }

  private wrapDriver(driver: TDriver, adapters: TAdapter[]) {
    /*const handler: ProxyHandler = {
      get(target, methodName, receiver) {
        return async function (...args: any[]) {
          // cada vez que se invoca un metodo sobre el driver, recorre la lista de adapters y si ese adapter tiene
          // una implementación para ese método, la invoca, pasandole los argumentos
          for (let i = 0; i < adapters.length; i++) {
            let adapter = adapters[i];
            const adapterMethod = adapter?.[methodName as keyof typeof adapter];
            if (typeof adapterMethod === 'function') {
              await adapterMethod(...args);
            }
          }

          // por ultimo invoca el mismo metodo sobre el driver
          const driverMethod = driver?.[methodName as keyof typeof driver];
          if (typeof driverMethod === 'function') {
            return await driverMethod(...args);
          }
        };
      },
    };*/
    const handler: ProxyHandler<TDriver> = {
      get(target, propName, receiver) {
        if (propName in target) {
          const prop = target[propName];
          if (typeof prop === 'function') {
            if (prop.constructor.name === 'AsyncFunction')
              return async function (...args: unknown[]) {
                adapters.forEach(async (adapter) => {
                  const adapterMethod = adapter[propName] as Function;
                  await adapterMethod(...args);
                });
                return await prop(...args);
              };
            else
              return function (...args: unknown[]) {
                adapters.forEach(async (adapter) => {
                  const adapterMethod = adapter[propName] as Function;
                  adapterMethod(...args);
                });
                return prop(...args);
              };
          }
        }
        return Reflect.get(target, propName, receiver);
      },
    };

    return new Proxy(driver, handler);
  }
}

interface Assembly {
  readonly name: string;
  readonly drivers: ReadonlyArray<{
    readonly name: string;
    readonly constructor: (...args: any) => any;
  }>;
  readonly adapters: ReadonlyArray<{
    readonly name: string;
    readonly constructor: (...args: any) => any;
  }>;
}

export function createAssembly<
  N extends string,
  DN extends string,
  D extends ReadonlyArray<{
    readonly name: DN;
    readonly constructor: (...args: any) => any;
  }>,
  AN extends string,
  A extends ReadonlyArray<{
    readonly name: AN;
    readonly constructor: (
      ...args: any
    ) => Partial<ReturnType<D[number]['constructor']>>;
  }>
>(
  name: N,
  config: { drivers: D; adapters: A }
): Readonly<{
  name: N;
  drivers: D;
  adapters: A;
}> {
  return {
    name,
    drivers: config.drivers,
    adapters: config.adapters,
  } as const satisfies Assembly;
}

export type Lineup = Assembly[];

export function TestAssemblyFactory<TAssembly extends Assembly>(
  assembly: TAssembly,
  {
    adaptersConstructorArgs,
    driversConstructorArgs,
  }: {
    adaptersConstructorArgs: Parameters<AdaptersConstructor<TAssembly>>;
    driversConstructorArgs: Parameters<DriversConstructor<TAssembly>>;
  }
) {
  const adapters = assembly.adapters.map((adapter) =>
    adapter.constructor(...(adaptersConstructorArgs as Iterable<any>))
  );
  const drivers = assembly.drivers.map((driver) => ({
    name: driver.name,
    driver: driver.constructor(...(driversConstructorArgs as Iterable<any>)),
  }));
  return new AssemblyRunner<TAssembly>(
    adapters,
    drivers
  ) as AssemblyRunner<TAssembly> & DriverRecord<TAssembly>;
}

export type TestAssembly<T extends Lineup> = ReturnType<
  typeof TestAssemblyFactory<T[number]>
>;

type ExtractConstructor<
  T extends Assembly,
  U extends 'drivers' | 'adapters'
> = T[U][number]['constructor'];
type AdaptersConstructor<T extends Assembly> = ExtractConstructor<
  T,
  'adapters'
>;
type DriversConstructor<T extends Assembly> = ExtractConstructor<T, 'drivers'>;

type ExtractDrivers<T extends Assembly> = T['drivers'][number];

type Adapter<T extends Assembly> = ReturnType<AdaptersConstructor<T>>;
type Driver<T extends Assembly> = ReturnType<DriversConstructor<T>>;
type DriverName<T extends Assembly> = ExtractDrivers<T>['name'];

type FilterDriverByName<
  T extends Assembly,
  U extends DriverName<T>
> = ExtractDrivers<T> & { name: U }; // El operador & es intersección. La intersección entre todos los drivers y el objeto { name: U } son los drivers con ese nombre

type DriverRecord<T extends Assembly> = {
  [K in DriverName<T>]: ReturnType<FilterDriverByName<T, K>['constructor']>;
};
