import { test as base } from "../../main/frontend/node_modules/playwright-bdd";
import {
  APIRequestContext,
  Page,
} from "../../main/frontend/node_modules/playwright/test";
import { TestAssembly } from "./test-drivers/assembly";
import { BienvenidaDriver } from "./test-drivers/bienvenida-driver";
import { BienvenidaHttpDriver } from "./test-drivers/bienvenida-http-driver";
import { BienvenidaPlaywrightDriver } from "./test-drivers/bienvenida-playwright-driver";
import { GruposDriver } from "./test-drivers/grupos-driver";
import { GruposHttpDriver } from "./test-drivers/grupos-https-driver";
import { GruposPlaywrightDriver } from "./test-drivers/grupos-playwright-driver";
import { MockApiAdapter } from "./test-drivers/mockApi-adapter";

export const test = base.extend<{
  autoTestFixture: void;
  assembly: TestAssembly<
    Partial<GruposDriver & BienvenidaDriver>,
    GruposDriver | BienvenidaDriver
  >;
}>({

  assembly: async ({ page, request }, use) => {
    const assemblyDefinition = ASSEMBLY_DEFINITIONS.find(
      (a) => a.name === process.env.ASSEMBLY_NAME
    );

    if (!assemblyDefinition)
      throw new Error(
        `Assembly not found. Available assemblies: ${ASSEMBLY_DEFINITIONS.map(
          (a) => a.name
        ).join(", ")}`
      );

    const adapters = assemblyDefinition.adaptersConstructors.map((c) =>
      c(page)
    );

    let testAssembly = new TestAssembly(adapters);

    assemblyDefinition.drivers.forEach((d) => {
      testAssembly.agregarDriver(d.name, d.constructor(request, page));
    });

    use(testAssembly);
  },
});

const ASSEMBLY_DEFINITIONS = [
  {
    name: "mock-api",
    adaptersConstructors: [(page: Page) => new MockApiAdapter(page)],
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
    adaptersConstructors: [],
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
    adaptersConstructors: [],
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
] as const;
