import { Grupo } from "src/app/model/grupo";
import { BackendAdapter } from "./backend-adapter";
import { Page } from "playwright/test";

export class MockApiAdapter implements BackendAdapter {

    private grupoEjemplo: Grupo = {
        miembros: ["nico", "toni"],
        nombre: "Grupo Ejemplo",
        id: 1,
        total: 10
    };

    private grupoCreado: Grupo = {
        miembros: ["laura", "lucia"],
        nombre: "Grupo creado",
        id: 2,
        total: 0
    };

    constructor(private page: Page) {
    }

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
    }

    async prepararGuardarGrupo(nombre: string, miembros: string[]): Promise<void> {
        
        this.grupoCreado.nombre = nombre;
        this.grupoCreado.miembros = miembros;

        await this.page.route('**/api/grupos', async (route) => {

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
                });
            }
        });
    }


    async prepararFalloAlGuardarGrupo(nombre: string, miembros: string[]): Promise<void> {
        
        await this.page.route('**/api/grupos', async (route) => {

            if (route.request().method() == 'POST') {
                await route.fulfill({
                    status: 400,
                    contentType: "application/json"
                });

            } else {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: [this.grupoEjemplo]
                });
            }
        });
    }

}