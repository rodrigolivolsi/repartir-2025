import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { createAssembly, Lineup, TestAssemblyFactory } from "packages/assembly-runner/dist/assembly";
import { BienvenidaCypressDriver } from "cypress/drivers/bienvenida-cypress-driver";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    //baseUrl: 'http://localhost:8080/',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      console.log('#################ARMANDO EL ASSEMBLY')
      console.log(config.env.ASSEMBLY_NAME)
      const assembly = lineup.find((a) => a.name === config.env.ASSEMBLY_NAME);
      if (!assembly)
        throw new Error(
          `Assembly not found. Available assemblies: ${lineup
            .map((a) => a.name)
            .join(", ")}`
        );
      
      const testAssembly = TestAssemblyFactory(assembly, {
        adaptersConstructorArgs: [],
        driversConstructorArgs: [],
      });
      console.log(testAssembly)
      config.env.assembly = testAssembly;

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});

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
  })
] as const satisfies Lineup;