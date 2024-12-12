type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

class AssemblyRunner<
  TAssembly extends Assembly,
  TAdapter = ReturnType<TAssembly["adapters"][number]["constructor"]>,
  TDriver = ReturnType<TAssembly["drivers"][number]["constructor"]>,
  TDriverName extends string = TAssembly["drivers"][number]["name"]
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

  /**
   * Agrega un driver al assembly y lo guarda en este assembly con el nombre especificado
   * @param driverName
   * @param driver
   */
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
    adaptersConstructorArgs: Parameters<
      TAssembly["adapters"][number]["constructor"]
    >;
    driversConstructorArgs: Parameters<
      TAssembly["drivers"][number]["constructor"]
    >;
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
  ) as AssemblyRunner<TAssembly> & {
    [K in TAssembly["drivers"][number]["name"]]: ReturnType<
      (TAssembly["drivers"][number] & { name: K })["constructor"]
    >;
  };
}

export type TestAssembly<TLineup extends Lineup> = ReturnType<
  typeof TestAssemblyFactory<TLineup[number]>
>;
