export class TestAssembly {
    
    constructor(private adapters: any[]){}

    /**
     * Agrega un driver al assembly y lo guarda en este assembly con el nombre especificado
     * @param driverName 
     * @param driver 
     */
    agregarDriver(driverName: string, driver: any) {
        let anyObj = this as any;
        anyObj[driverName] = wrapDriver(driver, this.adapters);
    }

    agregarDriverPrincipal(driverName: string, driver: any) {
        this.agregarDriver(driverName, driver);

        let anyObj = this as any;
        let driverPrincipal = anyObj[driverName];

        // copiamos todos los metodos del driver principal a este assembly para que se puedan llamar directamente
        // sin hacer referencia al nombre del driver
        Object.assign(this, driverPrincipal);
    }
}



export function wrapDriver(driver: any, adapters: any[]) {
    const handler = {
        get(target: any, methodName: string, receiver: any) {
            return async function (...args: any[]) {

                // cada vez que se invoca un metodo sobre el driver, recorre la lista de adapters y si ese adapter tiene 
                // una implementación para ese método, la invoca, pasandole los argumentos 
                for(let i = 0; i < adapters?.length; i++) {
                    let adapter = adapters[i];
                    if(typeof adapter[methodName] === 'function') {
                        await adapter[methodName](...args);
                    } 
                }

                // por ultimo invoca el mismo metodo sobre el driver
                await driver[methodName](...args);
            };
        }
    };
    return new Proxy(driver, handler);
}