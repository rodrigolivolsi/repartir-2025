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

                // es posible que haya que agregar más argumentos a esta lista si los steps reciben más de 6 parametros
                const [arg0, arg1, arg2, arg3, arg4, arg5, ...rest] = args;

                // cada vez que se invoca un metodo sobre el driver, recorre la lista de adapters y si ese adapter tiene 
                // una implementación para ese método, la invoca, pasandole los argumentos expandidos
                for(let i = 0; i < adapters?.length; i++) {
                    let adapter = adapters[i];
                    if(typeof adapter[methodName] === 'function') {
                        await adapter[methodName](arg0, arg1, arg2, arg3, arg4, arg5, rest);
                    } 
                }

                // por ultimo invoca el mismo metodo sobre el driver
                await driver[methodName](arg0, arg1, arg2, arg3, rest);
            };
        }
    };
    return new Proxy(driver, handler);
}