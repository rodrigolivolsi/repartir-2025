import { GruposDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/grupos-driver";
import { Grupo } from "../../src/app/model/grupo";

export class GruposCypressDriver implements GruposDriver {

    private nombreDeGrupoEsperado: string = "SIN ESPECIFICAR";

    async iniciar(): Promise<void> {
        cy.visit("/");
        cy.get('#usuarioInput').type("julian");
        cy.get('#iniciarBienvenidaButton').click();
    }

    async crearGrupo(nombre: string, miembros: Array<string>): Promise<Grupo> {
        this.nombreDeGrupoEsperado = nombre;
        cy.get("#crearGruposButton").click();
        cy.get("#nombreGrupoNuevoInput").type(nombre);
        
        for (let i = 0; i < miembros.length; i++) {
            cy.get("#miembrosGrupoNuevoInput").type(`${miembros[i]}{enter}`);
        }
        cy.get("#guardarGrupoNuevoButton").click();
        const grupoCreado: Grupo = {
            nombre: nombre,
            miembros,
        };
        return grupoCreado;
    }

    crearConUnUnicoMiembro(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async validarNombreDeGrupo(): Promise<void> {
        cy.get('table tbody tr').filter((_, element) => {
            return Cypress.$(element).text().includes(this.nombreDeGrupoEsperado);
        }).then((grupo) => {
            expect(grupo).to.exist;
        })
    }

    validarMiembrosDeGrupo(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    validarMensajeDeAlMenosDosMiembros(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    validarMontoTotal(montoEsperado: string, grupo: Grupo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}