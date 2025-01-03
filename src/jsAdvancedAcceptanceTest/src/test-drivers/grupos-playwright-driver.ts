import {
  Page,
  expect,
} from "../../../main/frontend/node_modules/playwright/test";
import { Grupo } from "../../../main/frontend/src/app/model/grupo";
import { GruposDriver } from "./grupos-driver";

export class GruposPlaywrightDriver implements GruposDriver {
  private nombreDeGrupoEsperado: string = "SIN ESPECIFICAR";
  private miembrosDeGrupoEsperados: Array<string> = [];

  constructor(private page: Page) {}

  /*
   * Los métodos deben ser declarados de la siguiente manera porque al convertirse esta clase de TS a JS y perder su tipo (pasa a ser de tipo "any")
   * el transpilador elimina los métodos pero no los atributos. Ejemplo:
   *
   * miMetodo = async(parametro: tipo): Promise<void> => {
   *  // implementacion del metodo
   * }
   */

  iniciar = async (): Promise<void> => {
    await this.page.goto("/");
    await this.page.getByRole("textbox").fill("julian");
    await this.page.locator("#iniciarBienvenidaButton").click();
  };

  crearCon = async (nombre: string): Promise<Grupo> => {
    let miembros = ["Victor", "Brenda"];
    return await this.crearConNombreYMiembros(nombre, miembros);
  };

  crearConMiembros = async (miembros: Array<string>): Promise<void> => {
    let nombre = "Grupo de Prueba";
    await this.crearConNombreYMiembros(nombre, miembros);
  };

  crearConUnUnicoMiembro = async (): Promise<void> => {
    await this.page.locator("#crearGruposButton").click();
    await this.page.locator("#nombreGrupoNuevoInput").fill("Grupo inválido");
    await this.page.locator("#miembrosGrupoNuevoInput").fill("Oscar");
    await this.page.keyboard.press("Enter");

    await this.page.locator("#guardarGrupoNuevoButton").click();
  };

  private async crearConNombreYMiembros(
    nombre: string,
    miembros: Array<string>
  ): Promise<Grupo> {
    const fecha = new Date();
    const nombreFecha =`${nombre}_${fecha.getTime()}`; 
    this.nombreDeGrupoEsperado = nombreFecha;
    const gruposAntesDeCrearUnoNuevo = await this.page
      .locator("app-grupos table tr")
      .count();

    await this.page.locator("#crearGruposButton").click();
    await this.page.locator("#nombreGrupoNuevoInput").fill(nombreFecha);

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
    
    const grupoFila = await this.page.locator("app-grupos table tr",{hasText:nombreFecha});
    let grupoId = await grupoFila.locator("td:nth-child(1)").textContent();
    const grupoCreado: Grupo = {//TODO completar datos de Grupo
      id : grupoId ? parseInt(grupoId): -1,
      nombre: '',
      miembros:  []
    };
    return grupoCreado;

  }

  crear = async (): Promise<Grupo> => {
    let nombre = "Grupo de 4";
    let miembros = ["Guido", "Laura", "Mariano", "Juan Cruz"];

    return await this.crearConNombreYMiembros(nombre, miembros);
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

  validarMontoTotal = async (montoEsperado: string, grupo: Grupo): Promise<void> => {
    let filaConGrupoId = this.page.locator(
      `app-grupos table tr:has(td:nth-child(1):text("${grupo.id}"))`
    );
    let monto = await filaConGrupoId.locator("td:nth-child(3)");

    await expect(monto).toContainText(montoEsperado);
  };
}
