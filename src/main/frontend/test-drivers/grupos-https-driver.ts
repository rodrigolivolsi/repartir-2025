import { APIRequestContext, expect } from "playwright/test";
import { GruposDriver } from "./grupos-driver";
import { Grupo } from "src/app/model/grupo";

export class GruposHttpDriver implements GruposDriver {

    constructor(
        private request: APIRequestContext) {
    }

    private nombreGrupo: string = "";
    private idGrupo: number | undefined;
    private miembrosGrupo: string[] = [];

    async iniciar(): Promise<void> {
        const inicio = await this.request.get("/api/grupos");
        expect(inicio.ok()).toBeTruthy();

        const pedido = await this.request.get("/api/usuarios/julian");
        expect(pedido.ok()).toBeTruthy();
    }
    
    async crearCon(nombre: string): Promise<void> {
        let nuevoGrupo : Grupo = {
            nombre: nombre,
            miembros: ["Jose", "Elena"]
        }
        await this.crearGrupo(nuevoGrupo);
    }

    private async crearGrupo(nuevoGrupo: Grupo) {
        const respuestaCrear = await this.request.post("/api/grupos", {
            data: nuevoGrupo
        });
        expect(respuestaCrear.ok()).toBeTruthy();
        let grupoCreado = await respuestaCrear.json() as Grupo;
        expect(grupoCreado.id).toBeTruthy();

        this.idGrupo = grupoCreado.id;
        this.nombreGrupo = nuevoGrupo.nombre;
        this.miembrosGrupo = nuevoGrupo.miembros;
    }

    async crearConMiembros(miembros: Array<string>): Promise<void> {
        let nuevoGrupo : Grupo = {
            nombre: "Grupo de cocina",
            miembros: miembros
        }
        await this.crearGrupo(nuevoGrupo);
    }

    async crearConUnUnicoMiembro(): Promise<void> {
        let nuevoGrupo : Grupo = {
            nombre: "Grupo invalido",
            miembros: ["Unico miembro"]
        }
        const respuestaCrear = await this.request.post("/api/grupos", {
            data: nuevoGrupo
        });
        expect(respuestaCrear.ok()).toBeFalsy();
    }

    async crear(): Promise<void> {
        let nuevoGrupo : Grupo = {
            nombre: "Futbol de los martes",
            miembros: ["Nico", "Tizi", "Santi"]
        }
        await this.crearGrupo(nuevoGrupo);
    }

    async validarNombreDeGrupo(): Promise<void> {
        let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
        expect(nuevoGrupo?.nombre).toBe(this.nombreGrupo);
    }

    private async buscarNuevoGrupoEnListado(): Promise<Grupo | undefined> {
        const listado = await this.request.get("/api/grupos");
        expect(listado.ok()).toBeTruthy();

        let grupos = await listado.json() as Grupo[];
        let nuevoGrupo = grupos.find(x => x.id == this.idGrupo);

        expect(nuevoGrupo).toBeTruthy();
        return nuevoGrupo;
    }

    async validarMiembrosDeGrupo(): Promise<void> {
        let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
        expect(nuevoGrupo?.miembros).toEqual(this.miembrosGrupo);
    }

    validarMensajeDeAlMenosDosMiembros(): void {
        // nada
    }
    
    async validarMontoTotal(montoEsperado: string): Promise<void> {
        let nuevoGrupo = await this.buscarNuevoGrupoEnListado();
        expect(nuevoGrupo?.total?.toString()).toEqual(montoEsperado);
    }

}