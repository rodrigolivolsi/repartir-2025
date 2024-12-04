export interface BienvenidaDriver {
  acceder(): Promise<void>;
  iniciar(): Promise<void>;
  validarMensajeDeBienvenida(): Promise<void>;
  validarQueSePuedeUsar(): Promise<void>;
}
