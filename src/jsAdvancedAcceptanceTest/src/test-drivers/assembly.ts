export class TestAssembly<
  TAdapter extends unknown,
  TDriver extends unknown,
  TDriverName extends string = string
> {
  drivers = {} as Record<TDriverName, TDriver>;
  constructor(private adapters: TAdapter[]) {}

  /**
   * Agrega un driver al assembly y lo guarda en este assembly con el nombre especificado
   * @param driverName
   * @param driver
   */
  agregarDriver(driverName: TDriverName, driver: TDriver) {
    let anyObj = this.drivers;
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
