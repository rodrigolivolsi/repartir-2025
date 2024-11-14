import { BienvenidaDriver } from "./bienvenida-driver";
import { Page, expect } from "playwright/test";

export class BienvenidaPlaywrightDriver implements BienvenidaDriver {

    constructor(
        private page: Page) {
    }

    acceder = async(): Promise<void> => {
        await this.page.goto('/');
    }

    iniciar = async(): Promise<void> => {
        await this.page.getByRole('textbox').fill('julian');
        await this.page.locator('#iniciarBienvenidaButton').click();
    }

    validarMensajeDeBienvenida = async(): Promise<void> => {
        let dialog = this.page.locator('p-dialog:has-text("Repartir")');
        await dialog.waitFor({ state: 'hidden', timeout: 2000 });
    }

    validarQueSePuedeUsar = async(): Promise<void> => {
        await this.page.locator("#crearGruposButton").click();
        let nuevoGrupoDialog = this.page.locator('#nuevoGrupoDialog');
        await expect(nuevoGrupoDialog).toContainText('Nuevo Grupo');
    }

}