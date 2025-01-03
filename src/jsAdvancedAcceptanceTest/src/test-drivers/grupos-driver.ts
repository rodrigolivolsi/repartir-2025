import { Grupo } from "../../../main/frontend/src/app/model/grupo";

export interface GruposDriver {
  iniciar(): Promise<void>;
  crearConNombreYMiembros(nombre: string, miembros: Array<string>): Promise<Grupo>;
  crearConUnUnicoMiembro(): Promise<void>;
  validarNombreDeGrupo(): Promise<void>;
  validarMiembrosDeGrupo(): Promise<void>;
  validarMensajeDeAlMenosDosMiembros(): Promise<void>;
  validarMontoTotal(montoEsperado: string, grupo:Grupo): Promise<void>;
  }
