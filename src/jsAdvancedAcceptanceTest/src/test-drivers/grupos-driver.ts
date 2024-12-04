export interface GruposDriver {
  iniciar(): Promise<void>;
  crearCon(nombre: string): Promise<void>;
  crearConMiembros(miembros: Array<string>): Promise<void>;
  crearConUnUnicoMiembro(): Promise<void>;
  crear(): Promise<void>;
  validarNombreDeGrupo(): Promise<void>;
  validarMiembrosDeGrupo(): Promise<void>;
  validarMensajeDeAlMenosDosMiembros(): Promise<void>;
  validarMontoTotal(montoEsperado: string): Promise<void>;
}
