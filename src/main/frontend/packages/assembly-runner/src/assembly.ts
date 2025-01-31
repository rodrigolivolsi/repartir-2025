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
    const handler: ProxyHandler<TDriver> = {
      get(driver, propName, receiver) {
        if (propName in driver) {
          const driverProperty = driver[propName];
          if (driverProperty instanceof Function) {
            if (driverProperty.constructor.name === 'AsyncFunction')
              return async (...args: unknown[]) => {
                adapters.forEach(async (adapter) => {
                  const adapterProperty = adapter[propName];
                  if (adapterProperty instanceof Function)
                    // we know its a function because its the same as target[propName] but it can be undefined
                    await adapterProperty.apply(adapter, args);
                });
                return await driverProperty.apply(driver, args);
              };
            else
              return (...args: unknown[]) => {
                adapters.forEach(async (adapter) => {
                  const adapterProperty = adapter[propName];
                  if (adapterProperty instanceof Function)
                    // we know its a function because its the same as target[propName] but it can be undefined
                    await adapterProperty.apply(adapter, args);
                });
                return driverProperty.apply(driver, args);
              };
          }
        }
        return Reflect.get(driver, propName, receiver);
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
    adaptersConstructorArgs: {
      [K in AdapterName<TAssembly>]: Parameters<
        FilterAdapterByName<TAssembly, K>['constructor']
      >;
    };
    driversConstructorArgs: {
      [K in DriverName<TAssembly>]: Parameters<
        FilterDriverByName<TAssembly, K>['constructor']
      >;
    };
  }
) {
  const adapters = assembly.adapters.map((adapter) =>
    adapter.constructor(
      ...(adaptersConstructorArgs[
        adapter.name as keyof typeof adaptersConstructorArgs
      ] as Iterable<any>)
    )
  );

  const drivers = assembly.drivers.map((driver) => ({
    name: driver.name,
    driver: driver.constructor(
      ...(driversConstructorArgs[
        driver.name as keyof typeof driversConstructorArgs
      ] as Iterable<any>)
    ),
  }));
  return new AssemblyRunner<TAssembly>(
    adapters,
    drivers
  ) as AssemblyRunner<TAssembly> &
    DriverRecord<TAssembly> &
    AdapterRecord<TAssembly>;
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
type ExtractAdapters<T extends Assembly> = T['adapters'][number];

type Adapter<T extends Assembly> = ReturnType<AdaptersConstructor<T>>;
type Driver<T extends Assembly> = ReturnType<DriversConstructor<T>>;
type DriverName<T extends Assembly> = ExtractDrivers<T>['name'];
type AdapterName<T extends Assembly> = ExtractAdapters<T>['name'];

type FilterDriverByName<
  T extends Assembly,
  U extends DriverName<T>
> = ExtractDrivers<T> & { name: U }; // El operador & es intersección. La intersección entre todos los drivers y el objeto { name: U } son los drivers con ese nombre

type DriverRecord<T extends Assembly> = {
  [K in DriverName<T>]: ReturnType<FilterDriverByName<T, K>['constructor']>;
};

type FilterAdapterByName<
  T extends Assembly,
  U extends AdapterName<T>
> = ExtractAdapters<T> & { name: U };

type AdapterRecord<T extends Assembly> = {
  [K in AdapterName<T>]: ReturnType<FilterAdapterByName<T, K>['constructor']>;
};
