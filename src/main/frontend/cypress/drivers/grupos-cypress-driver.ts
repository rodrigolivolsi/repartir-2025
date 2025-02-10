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

    async crearConUnUnicoMiembro(): Promise<void> {
        cy.get("#crearGruposButton").click();
        cy.get("#nombreGrupoNuevoInput").type('Grupo inválido');
        cy.get("#miembrosGrupoNuevoInput").type('Oscar{enter}');
        cy.get("#guardarGrupoNuevoButton").click();
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
    async validarMensajeDeAlMenosDosMiembros(): Promise<void> {
        cy.get('[role=alert]').then((elemento) => {
            expect(elemento.text()).to.contain('Error')
        });
    }

    async validarMontoTotal(montoEsperado: string, grupo: Grupo): Promise<void> {
        cy.get('table tbody tr').filter((index, element) => {
            return Cypress.$(element).text().includes(this.grupoEsperado.nombre);
        }).then((grupo) => {
            expect(grupo).to.exist;
            let montoEnString = grupo.find('td').eq(2).text().trim().replace(/\s+/g, ' ').match(/\d+/);
            let monto = montoEnString ? montoEnString[0] : undefined;
            expect(monto).to.equal(montoEsperado);
        });

    }
}