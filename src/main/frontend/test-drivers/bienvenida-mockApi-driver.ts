import { Grupo } from "src/app/model/grupo";
import { BienvenidaE2E } from "./bienvenida-e2e-driver";

export class BienvenidaMockApi extends BienvenidaE2E {

    private grupoEjemplo: Grupo = {
        miembros: ["nico", "toni"],
        nombre: "Grupo Ejemplo",
        id: 1,
        total: 10
    };


    async iniciar(): Promise<void> {

        await this.page.route('**/api/usuarios/**', route => route.fulfill({
            status: 200,
            contentType: "application/json"
        }));

        await this.page.route('**/api/grupos', route => route.fulfill({
            status: 200,
            contentType: "application/json",
            json: [this.grupoEjemplo]
        }));

        await super.iniciar();
    }
}