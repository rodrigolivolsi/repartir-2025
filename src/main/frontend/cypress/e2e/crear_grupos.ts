import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CustomContext } from "../support/e2e";
import { Grupo } from "../../src/app/model/grupo";

let grupo: Grupo = { nombre: '', miembros: []};

When("que el usuario inició Repartir", function (this: CustomContext) {
  this.assembly.grupos.iniciar();
});

When(
  "el usuario crea un grupo indicando el nombre {string}",
  function (this: CustomContext, nombre: string) {
    this.assembly.grupos.crearGrupo(generarNombreUnico(nombre), ["Victor", "Brenda"]).then((grupoDevuelto) => {
      grupo = grupoDevuelto
    });
  }
);

When("el usuario crea un grupo indicando que sus miembros son {string} y {string}", function (this: CustomContext, primerMiembro: string, segundoMiembro: string) {
  this.assembly.grupos.crearGrupo(generarNombreUnico("NombreDeGrupoValido"), [primerMiembro, segundoMiembro]).then((grupoDevuelto) => {
    grupo = grupoDevuelto
  });
});

When(
  "el usuario intenta crear un grupo indicando un único miembro",
  function (this: CustomContext) {
    this.assembly.grupos.crearConUnUnicoMiembro();
  }
);

When("el usuario crea un grupo", function (this: CustomContext) {
  this.assembly.grupos.crearGrupo(generarNombreUnico("Grupo de 4"),["Guido", "Laura", "Mariano", "Juan Cruz"]).then((grupoDevuelto) => {
    grupo = grupoDevuelto
  });
});

Then(
  "debería visualizar dentro del listado el grupo con el nombre indicado",
  function (this: CustomContext) {
    this.assembly.grupos.validarNombreDeGrupo();
  }
);

Then("visualiza dentro del listado el grupo con los miembros indicados", function (this: CustomContext) {
  this.assembly.grupos.validarMiembrosDeGrupo();
});

Then("no debería crear el grupo con un único miembro", function () { });

Then(
  "debería ser informado que necesita tener al menos dos miembros",
  function (this: CustomContext) {
    this.assembly.grupos.validarMensajeDeAlMenosDosMiembros();
  }
);

Then("debería visualizar dentro del listado el grupo con total $ {string}", function (this: CustomContext, montoEsperado: string) {
  this.assembly.grupos.validarMontoTotal(montoEsperado, grupo);
});

function generarNombreUnico(nombre: string) {
  const fecha = new Date();
  const nombreFecha = `${nombre}_${fecha.getTime()}`;
  return nombreFecha;
}