export interface BienvenidaDriver {
  acceder(): void;
  iniciar(): void;
  validarMensajeDeBienvenida(): void;
  validarQueSePuedeUsar(): void;
}
