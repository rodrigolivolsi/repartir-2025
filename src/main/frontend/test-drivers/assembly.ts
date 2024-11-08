import { BienvenidaDriver } from "./bienvenida-driver";
import { GruposDriver } from "./grupos-driver";

export class TestAssembly {

    constructor(private driver: any, private adapters: any[]){
    }

    async callMethod(methodName: string, args: any[]) {

        // es posible que haya que agregar más argumentos a esta lista si los steps reciben más de 4 parametros
        const [arg0, arg1, arg2, arg3, ...rest] = args;

        for(let i = 0; i < this.adapters?.length; i++) {
            let adapter = this.adapters[i];
            if(typeof adapter[methodName] === 'function') {
                await adapter[methodName](arg0, arg1, arg2, arg3, rest);
            } 
        }

        // TODO: manejar una lista de drivers?
        await this.driver[methodName](arg0, arg1, arg2, arg3, rest);
    }

}

export function buildTestAssembly(obj: TestAssembly) {
    const handler = {
        get(target: any, methodName: string, receiver: any) {
            return async function (...args: any[]) {
                await target.callMethod(methodName, args);
            };
        }
    };
    return new Proxy(obj, handler);
}