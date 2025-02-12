import {
  APIRequestContext,
  expect,
} from "../../../main/frontend/node_modules/playwright/test";
import { Grupo } from "../../../main/frontend/src/app/model/grupo";
import { GruposDriver } from "./grupos-driver";

export class GruposHttpDriver implements GruposDriver {
  constructor(private request: APIRequestContext) {}

  iniciar = async (): Promise<void> => {
    await this.request.get("/api/grupos");
    await this.request.get("/api/usuarios/julian");
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

  validarNombreDeGrupo = async (grupo: Grupo): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado(grupo);
    expect(nuevoGrupo?.nombre).toBe(grupo.nombre);
  };

  crearGrupo = async (
    nombre: string,
    miembros: Array<string>
  ): Promise<Grupo> => {
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

    return grupoCreado;
  };

  validarMiembrosDeGrupo = async (grupo: Grupo): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado(grupo);
    expect(nuevoGrupo?.miembros).toEqual(grupo.miembros);
  };

  validarMensajeDeAlMenosDosMiembros = async (): Promise<void> => {
    // nada
  };

  validarMontoTotal = async (
    montoEsperado: string,
    grupo: Grupo
  ): Promise<void> => {
    let nuevoGrupo = await this.buscarNuevoGrupoEnListado(grupo);
    expect(nuevoGrupo?.total?.toString()).toEqual(montoEsperado);
  };

  private async buscarNuevoGrupoEnListado(grupo: Grupo): Promise<Grupo | undefined> {

    expect(grupo.id).toBeDefined();

    const listado = await this.request.get("/api/grupos");
    expect(listado.ok()).toBeTruthy();

    let grupos = (await listado.json()) as Grupo[];
    let nuevoGrupo = grupos.find((x) => x.id == grupo.id);

    expect(nuevoGrupo).toBeTruthy();
    return nuevoGrupo;
  }
}
