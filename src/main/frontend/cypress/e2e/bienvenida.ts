import { When, Then, BeforeAll } from "@badeball/cypress-cucumber-preprocessor";
import { createAssembly, TestAssemblyFactory } from "../../packages/assembly-runner/src/assembly";
import { BienvenidaCypressDriver } from "../drivers/bienvenida-cypress-driver";

BeforeAll(function() {
  const adapterVacio = {};
  const assembly = createAssembly("e2e", {
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
    })
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