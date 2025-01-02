import { Grupo } from "../../../main/frontend/src/app/model/grupo";

export interface GruposDriver {
  iniciar(): Promise<void>;
  crearCon(nombre: string): Promise<Grupo>;
  crearConMiembros(miembros: Array<string>): Promise<void>;
  crearConUnUnicoMiembro(): Promise<void>;
  crear(): Promise<Grupo>;
  validarNombreDeGrupo(): Promise<void>;
  validarMiembrosDeGrupo(): Promise<void>;
  validarMensajeDeAlMenosDosMiembros(): Promise<void>;
  validarMontoTotal(montoEsperado: string, grupo:Grupo): Promise<void>;
}
