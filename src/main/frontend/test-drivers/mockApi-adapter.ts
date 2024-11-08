import { Grupo } from "src/app/model/grupo";
import { Page } from "playwright/test";

export class MockApiAdapter {

    private grupoEjemplo: Grupo = {
        miembros: ["nico", "toni"],
        nombre: "Grupo Ejemplo",
        id: 1,
        total: 10
    };

    private grupoCreado: Grupo = {
        miembros: ["laura", "lucia"],
        nombre: "Grupo creado",
        id: 2,
        total: 0
    };

    constructor(private page: Page) {
    }

    /*
    * Los métodos deben ser declarados de la siguiente manera porque al convertirse esta clase de TS a JS y perder su tipo (pasa a ser de tipo "any")
    * el transpilador elimina los métodos pero no los atributos. Ejemplo:
    * 
    * miMetodo = async(parametro: tipo): Promise<void> => {
    *  // implementacion del metodo
    * }
    */ 

    acceder = async (): Promise<void> => {
        await this.iniciarAplicacion();
    }

    iniciar = async (): Promise<void> => {
        await this.iniciarAplicacion();
    }

    private async iniciarAplicacion() {
        await this.page.route('**/api/usuarios/**', route => route.fulfill({
            status: 200,
            contentType: "application/json"
        }));

        await this.page.route('**/api/grupos', route => route.fulfill({
            status: 200,
            contentType: "application/json",
            json: [this.grupoEjemplo]
        }), { times: 1 });
    }

    crearCon = async(nombre: string): Promise<void> => {
        let miembros = ["Victor", "Brenda"];
        await this.prepararGuardarGrupo(nombre, miembros);
    }

    crearConMiembros = async(miembros: Array<string>): Promise<void> => {
        let nombre = "Grupo de Prueba";
        await this.prepararGuardarGrupo(nombre, miembros);
    }

    crear = async(): Promise<void> => {
        let nombre = "Grupo de 4";
        let miembros = ["Guido", "Laura", "Mariano", "Juan Cruz"];
        await this.prepararGuardarGrupo(nombre, miembros);
    }


    private async prepararGuardarGrupo(nombre: string, miembros: string[]): Promise<void> {
        
        this.grupoCreado.nombre = nombre;
        this.grupoCreado.miembros = miembros;

        await this.page.route('**/api/grupos', async (route) => {

            if (route.request().method() == 'POST') {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: this.grupoCreado
                });

            } else {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: [this.grupoEjemplo, this.grupoCreado]
                });
            }
        });
    }


    crearConUnUnicoMiembro = async(): Promise<void> => {
        
        await this.page.route('**/api/grupos', async (route) => {

            if (route.request().method() == 'POST') {
                await route.fulfill({
                    status: 400,
                    contentType: "application/json"
                });

            } else {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    json: [this.grupoEjemplo]
                });
            }
        });
    }

}