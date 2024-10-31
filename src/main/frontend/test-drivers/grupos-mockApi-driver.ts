import { GruposE2E } from "./grupos-e2e-driver";
import { Page, expect } from "playwright/test";

export class GruposMockApi extends GruposE2E {

    async iniciar(): Promise<void> {

        await this.page.route('**/api/usuarios/**', route => route.fulfill({
            status: 200
        }));

        await super.iniciar();
    }

    async crearCon(nombre: string): Promise<void> {
        await this.page.route('**/api/grupos/**', route => route.fulfill({
            status: 200
        }));

        await super.crearCon(nombre);
    }
}