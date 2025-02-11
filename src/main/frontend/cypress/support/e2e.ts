// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { BienvenidaCypressDriver } from "cypress/drivers/bienvenida-cypress-driver";
import { BienvenidaCypressHttpDriver } from 'cypress/drivers/bienvenida-http-driver';
import { createAssembly, Lineup, TestAssembly, TestAssemblyFactory } from "packages/assembly-runner/src/assembly";
import { GruposCypressDriver } from '../drivers/grupos-cypress-driver';
import { LoggerAdapter } from '../adapters/logger-adapter';

const lineup = [
  createAssembly("e2e", {
    drivers: [
      {
        name: "bienvenida",
        constructor: () =>
          new BienvenidaCypressDriver(),
      },
      {
        name: "grupos",
        constructor: () =>
          new GruposCypressDriver(),
      }
    ],
    adapters: [
      {
      name: "logger",
      constructor: () => 
        new LoggerAdapter(),
    }
  ],
  }),
  createAssembly("backend", {
    drivers: [
      {
        name: "bienvenida",
        constructor: () =>
          new BienvenidaCypressHttpDriver(),
      }
    ],
    adapters: [],
  }),
] satisfies Lineup

before(function() {
    const assembly = lineup.find((a) => a.name === Cypress.env('ASSEMBLY_NAME'));
    if (!assembly) {
      throw new Error(
        `Assembly not found. Available assemblies: ${lineup
          .map((a) => a.name)
          .join(", ")}`
      );
    }

    cy.task('log', `Using assembly: ${assembly.name}`);

    const testAssembly = TestAssemblyFactory(assembly, {
        adaptersConstructorArgs: { logger: [] },
        driversConstructorArgs: { bienvenida: [], grupos: [] },
    });

    Object.assign(this, new CustomContext(testAssembly));
  });

  export class CustomContext extends Mocha.Context {
    assembly: TestAssembly<typeof lineup>;
    constructor(testAssembly: TestAssembly<typeof lineup>) {
      super();
      this.assembly = testAssembly;
    }
  }