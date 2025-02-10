import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CustomContext } from "../support/e2e";

When("que el usuario inició Repartir", function (this: CustomContext) {
  this.assembly.grupos.iniciar();
});

When(
    "el usuario crea un grupo indicando el nombre {string}",
    function (this: CustomContext, nombre: string) {
      this.assembly.grupos.crearGrupo(generarNombreUnico(nombre),["Victor", "Brenda"]);
    }
);

Then(
  "debería visualizar dentro del listado el grupo con el nombre indicado",
  function (this: CustomContext) {
    this.assembly.grupos.validarNombreDeGrupo();
  }
);

function generarNombreUnico (nombre:string) {
  const fecha = new Date();
  const nombreFecha =`${nombre}_${fecha.getTime()}`; 
  return nombreFecha;
}