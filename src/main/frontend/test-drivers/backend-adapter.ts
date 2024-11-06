export interface BackendAdapter {

    iniciar(): Promise<void>;
    prepararGuardarGrupo(nombre: string, miembros: string[]): Promise<void>;
    prepararFalloAlGuardarGrupo(nombre: string, miembros: string[]): Promise<void>;
}