import { APIRequestContext, expect } from "playwright/test";
import { BienvenidaDriver } from "./bienvenida-driver";

export class BienvenidaHttpDriver implements BienvenidaDriver {

    constructor(
        private request: APIRequestContext) {
    }

    async acceder(): Promise<void> {

        const inicio = await this.request.get("/api/grupos");
        expect(inicio.ok()).toBeTruthy();
    }

    async iniciar(): Promise<void> {
        const pedido = await this.request.get("/api/usuarios/julian");
        expect(pedido.ok()).toBeTruthy();
    }

    validarMensajeDeBienvenida(): void {
        // nada
    }
    
    validarQueSePuedeUsar(): void {
        // nada
    }

}