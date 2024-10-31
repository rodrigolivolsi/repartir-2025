import { BienvenidaE2E } from "./bienvenida-e2e-driver";

export class BienvenidaMockApi extends BienvenidaE2E {


    async iniciar(): Promise<void> {
        await this.page.route('**/api/usuarios/**', route => route.fulfill({
            status: 200
        }));

        await super.iniciar();
    }
}