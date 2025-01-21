import {
  APIRequestContext,
  expect,
} from "../../../main/frontend/node_modules/playwright/test";
import { BienvenidaDriver } from "./bienvenida-driver";

export class BienvenidaHttpDriver implements BienvenidaDriver {
  constructor(private request: APIRequestContext) {}
  private inicio: any = undefined;
  private pedido: any = undefined;

  acceder = async (): Promise<void> => {
    this.inicio = await this.request.get("/api/grupos");
  };

  iniciar = async (): Promise<void> => {
    this.pedido = await this.request.get("/api/usuarios/julian");
  };

  validarMensajeDeBienvenida = async (): Promise<void> => {
    expect(this.inicio.ok()).toBeTruthy();
  };

  validarQueSePuedeUsar = async (): Promise<void> => {
    expect(this.pedido.ok()).toBeTruthy();
  };
}
