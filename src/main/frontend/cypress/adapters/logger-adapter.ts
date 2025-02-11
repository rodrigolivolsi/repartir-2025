import { BienvenidaDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/bienvenida-driver";
import { GruposDriver } from "../../../../jsAdvancedAcceptanceTest/src/test-drivers/grupos-driver";

export class LoggerAdapter implements Partial<BienvenidaDriver>, Partial<GruposDriver> {
    iniciar = async (): Promise<void> => {
        cy.task('log', '#######EJECUTA INICIAR DEL ADAPTADOR####');
    };
}