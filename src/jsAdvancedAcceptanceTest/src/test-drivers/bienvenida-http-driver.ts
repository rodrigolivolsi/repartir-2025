import {
  APIRequestContext,
  expect,
} from "../../../main/frontend/node_modules/playwright/test";
import { BienvenidaDriver } from "./bienvenida-driver";

export class BienvenidaHttpDriver implements BienvenidaDriver {
  constructor(private request: APIRequestContext) {}

  acceder = async (): Promise<void> => {
    const inicio = await this.request.get("/api/grupos");
    expect(inicio.ok()).toBeTruthy();
  };

  iniciar = async (): Promise<void> => {
    const pedido = await this.request.get("/api/usuarios/julian");
    expect(pedido.ok()).toBeTruthy();
  };

  validarMensajeDeBienvenida = async (): Promise<void> => {
    // nada
  };

  validarQueSePuedeUsar = async (): Promise<void> => {
    // nada
  };
}
