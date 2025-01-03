import {
  APIRequestContext,
  expect,
} from "playwright/test";
import { GruposDriver } from "./grupos-driver";
import { Grupo } from "../../../main/frontend/src/app/model/grupo";

export class GruposHttpDriver implements GruposDriver {
  constructor(private request: APIRequestContext) {}

  private nombreGrupo: string = "";
  private idGrupo: number | undefined;
  private miembrosGrupo: string[] = [];

  /*
   * Los métodos deben ser declarados de la siguiente manera porque al convertirse esta clase de TS a JS y perder su tipo (pasa a ser de tipo "any")
   * el transpilador elimina los métodos pero no los atributos. Ejemplo:
   *
   * miMetodo = async(parametro: tipo): Promise<void> => {
   *  // implementacion del metodo
   * }
   */

  iniciar = async (): Promise<void> => {
    const inicio = await this.request.get("/api/grupos");
    expect(inicio.ok()).toBeTruthy();

    const pedido = await this.request.get("/api/usuarios/julian");
    expect(pedido.ok()).toBeTruthy();
  };

  crearConUnUnicoMiembro = async (): Promise<void> => {
    let nuevoGrupo: Grupo = {
      nombre: "Grupo invalido",
      miembros: ["Unico miembro"],
    };
    const respuestaCrear = await this.request.post("/api/grupos", {
      data: nuevoGrupo,
    });
    expect(respuestaCrear.ok()).toBeFalsy();
  };

  validarNombreDeGrupo = async (): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
    expect(nuevoGrupo?.nombre).toBe(this.nombreGrupo);
  };

  crearGrupo = async (nombre: string, miembros: Array<string>): Promise<Grupo> => {
    let nuevoGrupo: Grupo = {
      nombre,
      miembros,
    };
    
    const respuestaCrear = await this.request.post("/api/grupos", {
      data: nuevoGrupo,
    });
    expect(respuestaCrear.ok()).toBeTruthy();
    let grupoCreado = (await respuestaCrear.json()) as Grupo;
    expect(grupoCreado.id).toBeTruthy();

    this.idGrupo = grupoCreado.id;
    this.nombreGrupo = nuevoGrupo.nombre;
    this.miembrosGrupo = nuevoGrupo.miembros;
    return grupoCreado;
  } 

  private async buscarNuevoGrupoEnListado(): Promise<Grupo | undefined> {
    const listado = await this.request.get("/api/grupos");
    expect(listado.ok()).toBeTruthy();

    let grupos = (await listado.json()) as Grupo[];
    let nuevoGrupo = grupos.find((x) => x.id == this.idGrupo);

    expect(nuevoGrupo).toBeTruthy();
    return nuevoGrupo;
  }

  validarMiembrosDeGrupo = async (): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
    expect(nuevoGrupo?.miembros).toEqual(this.miembrosGrupo);
  };

  validarMensajeDeAlMenosDosMiembros = async (): Promise<void> => {
    // nada
  };

  validarMontoTotal = async (montoEsperado: string, grupo:Grupo): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
    expect(nuevoGrupo?.total?.toString()).toEqual(montoEsperado);
  };
}
