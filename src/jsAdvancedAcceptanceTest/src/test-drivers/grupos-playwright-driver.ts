import {
  Page,
  expect,
} from "../../../main/frontend/node_modules/playwright/test";
import { Grupo } from "../../../main/frontend/src/app/model/grupo";
import { GruposDriver } from "./grupos-driver";

export class GruposPlaywrightDriver implements GruposDriver {
  private nombreDeGrupoEsperado: string = "SIN ESPECIFICAR";
  private miembrosDeGrupoEsperados: Array<string> = [];
  private grupoEsperado: Grupo = { nombre: '', miembros: []};

  constructor(private page: Page) {}

  iniciar = async (): Promise<void> => {
    await this.page.goto("/");
    await this.page.getByRole("textbox").fill("julian");
    await this.page.locator("#iniciarBienvenidaButton").click();
  };

  crearConUnUnicoMiembro = async (): Promise<void> => {
    await this.page.locator("#crearGruposButton").click();
    await this.page.locator("#nombreGrupoNuevoInput").fill("Grupo inválido");
    await this.page.locator("#miembrosGrupoNuevoInput").fill("Oscar");
    await this.page.keyboard.press("Enter");

    await this.page.locator("#guardarGrupoNuevoButton").click();
  };

  crearGrupo = async (
    nombre: string,
    miembros: Array<string>
  ): Promise<void> => {
    this.nombreDeGrupoEsperado = nombre;
    const gruposAntesDeCrearUnoNuevo = await this.page
      .locator("app-grupos table tr")
      .count();

    await this.page.locator("#crearGruposButton").click();
    await this.page.locator("#nombreGrupoNuevoInput").fill(nombre);

    for (let i = 0; i < miembros.length; i++) {
      await this.page.locator("#miembrosGrupoNuevoInput").fill(miembros[i]);
      await this.page.keyboard.press("Enter");
      this.miembrosDeGrupoEsperados.push(miembros[i]);
    }

    await this.page.locator("#guardarGrupoNuevoButton").click();

    await this.page.waitForFunction((gruposAntesDeCrearUnoNuevo) => {
      const gruposAhora = document.querySelectorAll(
        "app-grupos table tr"
      ).length;
      return gruposAhora > gruposAntesDeCrearUnoNuevo;
    }, gruposAntesDeCrearUnoNuevo);

    const grupoFila = await this.page.locator("app-grupos table tr", {
      hasText: nombre,
    });
    const grupoId = await grupoFila.locator("td:nth-child(1)").textContent();

    const grupoCreado: Grupo = {
      id: grupoId ? parseInt(grupoId) : -1,
      nombre: nombre,
      miembros,
    };

    this.grupoEsperado = grupoCreado;
  };

  validarNombreDeGrupo = async (): Promise<void> => {
    await expect(this.page.getByRole("alert")).toContainText(
      this.nombreDeGrupoEsperado
    );
  };

  validarMiembrosDeGrupo = async (): Promise<void> => {
    let row = this.page
      .locator(
        `app-grupos table tr:has(td:nth-child(2):text("${this.nombreDeGrupoEsperado}"))`
      )
      .last();
    let miembros = await row.locator("td:nth-child(4)");

    for (let index = 0; index < this.miembrosDeGrupoEsperados.length; index++) {
      await expect(miembros).toContainText(
        this.miembrosDeGrupoEsperados[index]
      );
    }
  };

  validarMensajeDeAlMenosDosMiembros = async (): Promise<void> => {
    let mensajesToast = this.page.getByRole("alert");
    await mensajesToast.waitFor({ state: "visible", timeout: 2000 });
    await expect(mensajesToast).toContainText("Error");
  };

  validarMontoTotal = async (
    montoEsperado: string
  ): Promise<void> => {
    const filaConGrupoId = await this.page.locator("app-grupos table tr", {
      hasText: this.grupoEsperado.nombre,
    });
    let monto = await filaConGrupoId.locator("td:nth-child(3)");

    await expect(monto).toContainText(montoEsperado);
  };
}
