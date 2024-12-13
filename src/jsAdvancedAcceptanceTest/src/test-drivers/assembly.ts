class AssemblyRunner<
  TAssembly extends Assembly,
  TAdapter = Adapter<TAssembly>,
  TDriver = Driver<TAssembly>,
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
    const handler = {
      get(target: any, methodName: string, receiver: any) {
        return async function (...args: any[]) {
          // cada vez que se invoca un metodo sobre el driver, recorre la lista de adapters y si ese adapter tiene
          // una implementación para ese método, la invoca, pasandole los argumentos
          for (let i = 0; i < adapters.length; i++) {
            let adapter = adapters[i];
            const adapterMethod = adapter?.[methodName as keyof typeof adapter];
            if (typeof adapterMethod === "function") {
              await adapterMethod(...args);
            }
          }

          // por ultimo invoca el mismo metodo sobre el driver
          const driverMethod = driver?.[methodName as keyof typeof driver];
          if (typeof driverMethod === "function") {
            await driverMethod(...args);
          }
        };
      },
    };
    return new Proxy(driver, handler);
  }
}

interface Assembly {
  name: string;
  adapters: {
    name: string;
    constructor: (...args: any) => any;
  }[];
  drivers: {
    name: string;
    constructor: (...args: any) => any;
  }[];
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
    adapter.constructor(...adaptersConstructorArgs)
  );
  const drivers = assembly.drivers.map((driver) => ({
    name: driver.name,
    driver: driver.constructor(...driversConstructorArgs),
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
  U extends "drivers" | "adapters"
> = T[U][number]["constructor"];
type AdaptersConstructor<T extends Assembly> = ExtractConstructor<
  T,
  "adapters"
>;
type DriversConstructor<T extends Assembly> = ExtractConstructor<T, "drivers">;

type ExtractDrivers<T extends Assembly> = T["drivers"][number];

type Adapter<T extends Assembly> = ReturnType<AdaptersConstructor<T>>;
type Driver<T extends Assembly> = ReturnType<DriversConstructor<T>>;
type DriverName<T extends Assembly> = ExtractDrivers<T>["name"];

type FilterDriverByName<
  T extends Assembly,
  U extends DriverName<T>
> = ExtractDrivers<T> & { name: U }; // El operador & es intersección. La intersección entre todos los drivers y el objeto { name: U } son los drivers con ese nombre

type DriverRecord<T extends Assembly> = {
  [K in DriverName<T>]: ReturnType<FilterDriverByName<T, K>["constructor"]>;
};
