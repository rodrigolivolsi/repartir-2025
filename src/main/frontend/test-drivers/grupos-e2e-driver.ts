import { Page, expect } from "playwright/test";
import { GruposDriver } from "./grupos-driver";

export class GruposE2E implements GruposDriver {
    nombreDeGrupoEsperado: string = "SIN ESPECIFICAR";
    miembrosDeGrupoEsperados: Array<string> = []
    page: Page;
    context: any = {};
    constructor(page: Page) {
        this.page = page;
    }

    async iniciar(): Promise<void> {
        await this.page.goto('/');
        await this.page.getByRole('textbox').fill('julian');
        await this.page.locator('#iniciarBienvenidaButton').click()
    }

    async crearCon(nombre: string): Promise<void> {
        this.nombreDeGrupoEsperado = nombre;
        await this.page.locator('#crearGruposButton').click()
        await this.page.locator('#nombreGrupoNuevoInput').fill(nombre);
        await this.page.locator('#miembrosGrupoNuevoInput').fill('Victor');
        await this.page.keyboard.press('Enter');
        await this.page.locator('#miembrosGrupoNuevoInput').fill('Brenda');
        await this.page.keyboard.press('Enter');
        await this.page.locator('#guardarGrupoNuevoButton').click();
    }

    async crearConMiembros(miembros: Array<string>): Promise<void> {
        await this.page.locator("#crearGruposButton").click();
        await this.page.locator("#nombreGrupoNuevoInput").fill("After Office");

        for(let i = 0; i < miembros.length; i++) {
            await this.page.locator('#miembrosGrupoNuevoInput').fill(miembros[i]);
            await this.page.keyboard.press('Enter');
            this.miembrosDeGrupoEsperados.push(miembros[i])
        }

        await this.page.locator("#guardarGrupoNuevoButton").click();
    }

    async crearConUnUnicoMiembro(): Promise<void> {
        await this.page.locator("#crearGruposButton").click();

        await this.page.locator("#nombreGrupoNuevoInput").fill("After Office");

        await this.page.locator('#miembrosGrupoNuevoInput').fill("Oscar");
        await this.page.keyboard.press('Enter');

        await this.page.locator("#guardarGrupoNuevoButton").click();
    }

    async crear(): Promise<void> {

        const gruposAntesDeCrearUnoNuevo = await this.page.locator('app-grupos table tr').count();

        await this.page.locator("#crearGruposButton").click();

        await this.page.locator("#nombreGrupoNuevoInput").fill("Grupo de 4");

        await this.page.locator('#miembrosGrupoNuevoInput').fill("Guido");
        await this.page.keyboard.press('Enter');
        await this.page.locator('#miembrosGrupoNuevoInput').fill("Laura");
        await this.page.keyboard.press('Enter');
        await this.page.locator('#miembrosGrupoNuevoInput').fill("Mariano");
        await this.page.keyboard.press('Enter');
        await this.page.locator('#miembrosGrupoNuevoInput').fill("Juan Cruz");
        await this.page.keyboard.press('Enter');

        await this.page.locator("#guardarGrupoNuevoButton").click();

        await this.page.waitForFunction(
            (gruposAntesDeCrearUnoNuevo) => {
            const gruposAhora = document.querySelectorAll('app-grupos table tr').length;
            return gruposAhora > gruposAntesDeCrearUnoNuevo;
            },
            gruposAntesDeCrearUnoNuevo
        );
        let ultimaFila = this.page.locator('app-grupos table tr').last();

        let grupoId = await ultimaFila.locator('td:nth-child(1)').textContent();

        this.context.grupoId = grupoId;

    }

    async validarNombreDeGrupo(): Promise<void> {
        await expect(this.page.getByRole('alert')).toContainText(this.nombreDeGrupoEsperado);
    }

    async validarMiembrosDeGrupo(): Promise<void> {
        let nombreGrupo = 'After Office'
        let row = this.page.locator(`app-grupos table tr:has(td:nth-child(2):text("${nombreGrupo}"))`);
        let miembros = await row.locator('td:nth-child(4)')

        await expect(miembros.nth(1)).toContainText(this.miembrosDeGrupoEsperados[0]);
        await expect(miembros.nth(1)).toContainText(this.miembrosDeGrupoEsperados[1]);
    }

    async validarMensajeDeAlMenosDosMiembros(): Promise<void> {
        let mensajesToast = this.page.getByRole('alert');
        await mensajesToast.waitFor({ state: 'visible', timeout: 2000 });
        await expect(mensajesToast).toContainText('Error');
        await expect(mensajesToast).toContainText('No se puede guardar');
    }

    async validarMontoTotal(montoEsperado: string): Promise<void> {
        let filaConGrupoId = this.page.locator(`app-grupos table tr:has(td:nth-child(1):text("${this.context.grupoId}"))`);
        let monto = await filaConGrupoId.locator('td:nth-child(3)');

        await expect(monto).toContainText(montoEsperado);
    }
}