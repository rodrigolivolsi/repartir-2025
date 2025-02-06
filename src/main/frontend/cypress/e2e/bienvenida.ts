import { When, Then, BeforeAll } from "@badeball/cypress-cucumber-preprocessor";
import { createAssembly, Lineup, TestAssembly, TestAssemblyFactory } from "../../packages/assembly-runner/src/assembly";
import { BienvenidaCypressDriver } from "../drivers/bienvenida-cypress-driver";

BeforeAll(function() {

  const adapterVacio = {};
  const lineup = [
    createAssembly("e2e", {
      drivers: [
        {
          name: "bienvenida",
          constructor: () =>
            new BienvenidaCypressDriver(),
        }
      ],
      adapters: [
        {
          name: "adapter",
          constructor: () => adapterVacio,
        },
      ],
    }),
  ] as const satisfies Lineup; // IMPORTANTISIMO!!!!!!! tiene que ser satisfies

  const assembly = lineup.find((a) => a.name === Cypress.env('ASSEMBLY_NAME'));
    if (!assembly) {
      throw new Error(
        `Assembly not found. Available assemblies: ${lineup
          .map((a) => a.name)
          .join(", ")}`
      );
    }

  const testAssembly = TestAssemblyFactory(assembly, {
      adaptersConstructorArgs: { adapter: [] },
      driversConstructorArgs: { bienvenida: [] },
  });

  Object.assign(this, {
    assembly: testAssembly
  })
})

When("el usuario accede a la aplicación", function() {
  this.assembly.bienvenida.acceder();
});

Then("se muestra el mensaje de bienvenida", function() {
  this.assembly.bienvenida.validarMensajeDeBienvenida();
});