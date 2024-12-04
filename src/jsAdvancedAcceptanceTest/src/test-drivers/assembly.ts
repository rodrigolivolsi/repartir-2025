export class TestAssembly<TAdapter extends unknown, TDriver extends unknown> {
  constructor(private adapters: TAdapter[]) {}

  /**
   * Agrega un driver al assembly y lo guarda en este assembly con el nombre especificado
   * @param driverName
   * @param driver
   */
  agregarDriver(driverName: string, driver: TDriver) {
    let anyObj = this as any;
    anyObj[driverName] = this.wrapDriver(driver, this.adapters);
  }

  agregarDriverPrincipal(driverName: string, driver: TDriver) {
    this.agregarDriver(driverName, driver);

    let anyObj = this as any;
    let driverPrincipal = anyObj[driverName];

    // copiamos todos los metodos del driver principal a este assembly para que se puedan llamar directamente
    // sin hacer referencia al nombre del driver
    Object.assign(this, driverPrincipal);
  }

  wrapDriver(driver: TDriver, adapters: TAdapter[]) {
    const handler = {
      get(target: any, methodName: string, receiver: any) {
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
            await driverMethod(...args);
          }
        };
      },
    };
    return new Proxy(driver, handler);
  }
}
