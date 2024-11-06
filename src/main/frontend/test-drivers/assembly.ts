import { BienvenidaDriver } from "./bienvenida-driver";
import { GruposDriver } from "./grupos-driver";

export class TestAssembly {

    constructor(private driver: any, private adapters: any[]){
    }

    async callMethod(methodName: string, ...args: any[]) {

        for(let i = 0; i < this.adapters?.length; i++) {
            if(typeof this.adapters[i].methodName === 'function') {
                await this.adapters[i][methodName](args);
            }
        }

        await this.driver[methodName](args);
    }

}

export function buildTestAssembly(obj: TestAssembly) {
    const handler = {
        get(target: any, methodName: string, receiver: any) {
            return async function (...args: any[]) {
                console.log(`Intercepted '${methodName}' with arguments ${JSON.stringify(args)}`);
                await target.callMethod(methodName, args);
            };
        }
    };
    return new Proxy(obj, handler);
}