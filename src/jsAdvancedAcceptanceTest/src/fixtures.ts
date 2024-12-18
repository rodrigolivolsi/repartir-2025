import { test as base } from "../../main/frontend/node_modules/playwright-bdd";
import {
  APIRequestContext,
  Page,
} from "../../main/frontend/node_modules/playwright/test";
import {
  Lineup,
  TestAssembly,
  TestAssemblyFactory,
} from "../../main/frontend/node_modules/@grupo-esfera/assembly-runner/src/assembly";
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

    let testAssembly = TestAssemblyFactory(assembly, {
      adaptersConstructorArgs: [page],
      driversConstructorArgs: [request, page],
    });

    use(testAssembly);
  },
});

const lineup = [
  {
    name: "mock-api",
    adapters: [
      {
        name: "mock-api",
        constructor: (page: Page) => new MockApiAdapter(page),
      },
    ],
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
  },
  {
    name: "e2e",
    adapters: [],
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
  },
  {
    name: "backend",
    adapters: [],
    drivers: [
      {
        name: "bienvenida",
        constructor: (req: APIRequestContext, _: Page) =>
          new BienvenidaHttpDriver(req),
      },
      {
        name: "grupos",
        constructor: (req: APIRequestContext, _: Page) =>
          new GruposHttpDriver(req),
      },
    ],
  },
] as const satisfies Lineup; // IMPORTANTISIMO!!!!!!! tiene que ser satisfies
