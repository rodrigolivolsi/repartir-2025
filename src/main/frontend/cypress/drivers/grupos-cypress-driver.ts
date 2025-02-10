import { GruposDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/grupos-driver";
import { Grupo } from "../../src/app/model/grupo";

export class GruposCypressDriver implements GruposDriver {

    private grupoEsperado: any;
    private nombreDeGrupoEsperado: string = "SIN ESPECIFICAR";
    private miembrosDeGrupoEsperados: Array<string> = [];

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
            this.miembrosDeGrupoEsperados.push(miembros[i]);
        }
        cy.get("#guardarGrupoNuevoButton").click();
        const grupoCreado: Grupo = {
            nombre: nombre,
            miembros,
        };

        this.grupoEsperado = grupoCreado;
        return grupoCreado;
    }

    crearConUnUnicoMiembro(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async validarNombreDeGrupo(): Promise<void> {
        cy.get('table tbody tr').filter((_, element) => {
            return Cypress.$(element).text().includes(this.grupoEsperado.nombre);
        }).then((grupo) => {
            expect(grupo).to.exist;
        })
    }

    async validarMiembrosDeGrupo(): Promise<void> {
        cy.get('table tbody tr').filter((_, element) => {
            return Cypress.$(element).text().includes(this.grupoEsperado.nombre);
        }).then((grupo) => {
            for (let i = 0; i < this.grupoEsperado.miembros.length; i++) {
                cy.wrap(grupo).find('p-chip').contains(this.grupoEsperado.miembros[i]).should('exist');
            }
        })
    }
    validarMensajeDeAlMenosDosMiembros(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    validarMontoTotal(montoEsperado: string, grupo: Grupo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}