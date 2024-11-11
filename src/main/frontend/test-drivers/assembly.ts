export class TestAssembly {
    
    constructor(private adapters: any[]){}

    /**
     * Agrega un driver al assembly y lo guarda en este assembly con el nombre especificado
     * @param driverName 
     * @param driver 
     */
    addDriver(driverName: string, driver: any) {
        let anyObj = this as any;
        anyObj[driverName] = wrapDriver(driver, this.adapters);
    }
}



export function wrapDriver(driver: any, adapters: any[]) {
    const handler = {
        get(target: any, methodName: string, receiver: any) {
            return async function (...args: any[]) {

                // cada vez que se invoca un metodo sobre el driver, recorre la lista de adapters y si ese adapter tiene 
                // una implementación para ese método, la invoca, pasandole los argumentos expandidos
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