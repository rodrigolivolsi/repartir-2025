import { Grupo } from "src/app/model/grupo";
import { GruposE2E } from "./grupos-e2e-driver";
import { Page, expect } from "playwright/test";

export class GruposMockApi extends GruposE2E {

    private grupoEjemplo: Grupo = {
        miembros: ["nico", "toni"],
        nombre: "Grupo Ejemplo",
        id: 1,
        total: 10
    };

    private grupoCreado: Grupo = {
        miembros: ["laura", "lucia"],
        nombre: "",
        id: 2,
        total: 0
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
        }), { times: 1 });

        await super.iniciar();
    }

    async crearCon(nombre: string): Promise<void> {

        this.grupoCreado.nombre = nombre;
        await this.page.route('**/api/grupos', async route => {

            if (route.request().method() == 'POST') {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: this.grupoCreado
                });

            } else {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: [this.grupoEjemplo, this.grupoCreado]
                })
            }
          });

        await super.crearCon(nombre);
    }
}