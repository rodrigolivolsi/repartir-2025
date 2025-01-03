import {
  Lineup,
  TestAssembly,
  TestAssemblyFactory,
  createAssembly,
} from "../../main/frontend/node_modules/@grupo-esfera/assembly-runner/src/assembly";
import { test as base } from "../../main/frontend/node_modules/playwright-bdd";
import {
  APIRequestContext,
  Page,
} from "../../main/frontend/node_modules/playwright/test";
import { BienvenidaHttpDriver } from "./test-drivers/bienvenida-http-driver";
import { BienvenidaPlaywrightDriver } from "./test-drivers/bienvenida-playwright-driver";
import { GruposHttpDriver } from "./test-drivers/grupos-https-driver";
import { GruposPlaywrightDriver } from "./test-drivers/grupos-playwright-driver";
import { MockApiAdapter } from "./test-drivers/mockApi-adapter";

export const test = base.extend<{
  assembly: TestAssembly<typeof lineup>;
}>({
  assembly: async ({ page, request }, use) => {
    const assembly = lineup.find((a) => a.name === process.env.ASSEMBLY_NAME);
    if (!assembly)
      throw new Error(
        `Assembly not found. Available assemblies: ${lineup
          .map((a) => a.name)
          .join(", ")}`
      );

    const testAssembly = TestAssemblyFactory(assembly, {
      adaptersConstructorArgs: [page],
      driversConstructorArgs: [request, page],
    });

    use(testAssembly);
  },
});

const lineup = [
  createAssembly("mock-api", {
    drivers: [
      {
        name: "bienvenida",
        constructor: (_: APIRequestContext, page: Page) =>
          new BienvenidaPlaywrightDriver(page),
      },
      {
        name: "grupos",
        constructor: (_: APIRequestContext, page: Page) =>
          new GruposPlaywrightDriver(page),
      },
    ],
    adapters: [
      {
        name: "mock-api",
        constructor: (page: Page) => new MockApiAdapter(page),
      },
    ],
  }),
  createAssembly("e2e", {
    drivers: [
      {
        name: "bienvenida",
        constructor: (_: APIRequestContext, page: Page) =>
          new BienvenidaPlaywrightDriver(page),
      },
      {
        name: "grupos",
        constructor: (_: APIRequestContext, page: Page) =>
          new GruposPlaywrightDriver(page),
      },
    ],
    adapters: [],
  }),
  createAssembly("backend", {
    drivers: [
      {
        name: "bienvenida",
        constructor: (_: APIRequestContext, page: Page) =>
          new BienvenidaHttpDriver(_),
      },
      {
        name: "grupos",
        constructor: (_: APIRequestContext, page: Page) =>
          new GruposHttpDriver(_),
      },
    ],
    adapters: [],
  }),
] as const satisfies Lineup; // IMPORTANTISIMO!!!!!!! tiene que ser satisfies
