import { Grupo } from "../../../main/frontend/src/app/model/grupo";

export interface GruposDriver {
  iniciar(): Promise<void>;
  crearGrupo(nombre: string, miembros: Array<string>): Promise<void>;
  crearConUnUnicoMiembro(): Promise<void>;
  validarNombreDeGrupo(): Promise<void>;
  validarMiembrosDeGrupo(): Promise<void>;
  validarMensajeDeAlMenosDosMiembros(): Promise<void>;
  validarMontoTotal(montoEsperado: string): Promise<void>;
  }
