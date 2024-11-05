import { BackendAdapter } from "./backend-adapter";
import { BienvenidaDriver } from "./bienvenida-driver";
import { Page, expect } from "playwright/test";

export class BienvenidaPlaywrightDriver implements BienvenidaDriver {

    constructor(
        private page: Page, 
        private adapter: BackendAdapter | undefined) {
    }

    async acceder(): Promise<void> {
        await this.page.goto('/');
    }

    async iniciar(): Promise<void> {
        await this.adapter?.prepararIniciar();

        await this.page.getByRole('textbox').fill('julian');
        await this.page.locator('#iniciarBienvenidaButton').click();
    }

    async validarMensajeDeBienvenida(): Promise<void> {
        let dialog = this.page.locator('p-dialog:has-text("Repartir")');
        await dialog.waitFor({ state: 'hidden', timeout: 2000 });
    }

    async validarQueSePuedeUsar(): Promise<void> {
        await this.page.locator("#crearGruposButton").click();
        let nuevoGrupoDialog = this.page.locator('#nuevoGrupoDialog');
        await expect(nuevoGrupoDialog).toContainText('Nuevo Grupo');
    }

}