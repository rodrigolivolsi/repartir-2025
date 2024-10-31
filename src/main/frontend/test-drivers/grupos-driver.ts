export interface GruposDriver {
    iniciar(): void;
    crearCon(nombre: String): void;
    crearConMiembros(miembros: Array<string>): void;
    crearConUnUnicoMiembro(): void;
    crear(): void;
    validarNombreDeGrupo(): void;
    validarMiembrosDeGrupo(): void;
    validarMensajeDeAlMenosDosMiembros(): void;
    validarMontoTotal(montoEsperado: string): void;
}