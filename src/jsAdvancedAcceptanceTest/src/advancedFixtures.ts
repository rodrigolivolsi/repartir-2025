import { test as base } from "../../main/frontend/node_modules/playwright-bdd";
import MCR from "../../main/frontend/node_modules/monocart-coverage-reports";
import coverageOptions from "./mcr.config";
import { BienvenidaPlaywrightDriver } from "./test-drivers/bienvenida-playwright-driver";
import { MockApiAdapter } from "./test-drivers/mockApi-adapter";
import { GruposPlaywrightDriver } from "./test-drivers/grupos-playwright-driver";
import { TestAssembly } from "./test-drivers/assembly";
import { BienvenidaHttpDriver } from "./test-drivers/bienvenida-http-driver";
import { GruposHttpDriver } from "./test-drivers/grupos-https-driver";
import {
  APIRequestContext,
  Page,
} from "../../main/frontend/node_modules/playwright/test";
import { GruposDriver } from "./test-drivers/grupos-driver";
import { BienvenidaDriver } from "./test-drivers/bienvenida-driver";

export const test = base.extend<{
  autoTestFixture: void;
  assembly: TestAssembly<
    Partial<GruposDriver & BienvenidaDriver>,
    GruposDriver | BienvenidaDriver
  >;
}>({
  autoTestFixture: [
    async ({ page }, use) => {
      const medirCobertura =
        process.env.CI && test.info().project.name === "chromium";

      // coverage API is chromium only
      if (medirCobertura) {
        await Promise.all([
          page.coverage.startJSCoverage({
            resetOnNavigation: false,
          }),
          // CSS coverage disabled for now
          // page.coverage.startCSSCoverage({
          //     resetOnNavigation: false
          // })
        ]);
      }

      await use();

      if (medirCobertura) {
        const [jsCoverage /*, cssCoverage*/] = await Promise.all([
          page.coverage.stopJSCoverage(),
          //page.coverage.stopCSSCoverage()
        ]);
        const coverageList = [...jsCoverage /*, ... cssCoverage*/];

        const mcr = MCR(coverageOptions);
        await mcr.add(coverageList);
      }
    },
    { auto: true },
  ],
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
