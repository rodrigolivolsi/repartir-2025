import { test as base } from 'playwright-bdd';
import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { BienvenidaDriver } from 'test-drivers/bienvenida-driver';
import { GruposDriver } from 'test-drivers/grupos-driver';
import { BienvenidaPlaywrightDriver } from 'test-drivers/bienvenida-playwright-driver';
import { MockApiAdapter } from 'test-drivers/mockApi-adapter';
import { GruposPlaywrightDriver } from 'test-drivers/grupos-playwright-driver';
import { buildTestAssembly, TestAssembly } from 'test-drivers/assembly';

export const test = base.extend<{ autoTestFixture: void, bienvenidaDriver: BienvenidaDriver, gruposDriver: GruposDriver }>({
  autoTestFixture: [async ({ page }, use) => {

    const medirCobertura = process.env.CI && test.info().project.name === 'chromium';

    // coverage API is chromium only
    if (medirCobertura) {
        await Promise.all([
            page.coverage.startJSCoverage({
                resetOnNavigation: false
            }),
            // CSS coverage disabled for now
            // page.coverage.startCSSCoverage({
            //     resetOnNavigation: false
            // })
        ]);
    }

    await use();

    if (medirCobertura) {
        const [jsCoverage/*, cssCoverage*/] = await Promise.all([
            page.coverage.stopJSCoverage(),
            //page.coverage.stopCSSCoverage()
        ]);
        const coverageList = [... jsCoverage/*, ... cssCoverage*/];

        const mcr = MCR(coverageOptions);
        await mcr.add(coverageList);
    }


  }, { auto: true }],
  bienvenidaDriver: async({page}, use) => {

    if (process.env.API == 'mock') {
      console.log("Using mocks for the API");
      use(buildTestAssembly(new TestAssembly(new BienvenidaPlaywrightDriver(page), [new MockApiAdapter(page)])));

    } else {
      use(new BienvenidaPlaywrightDriver(page));
    }
  },
  gruposDriver: async({page}, use) => { 
    if (process.env.API == 'mock') {
      console.log("Using mocks for the API");
      use(buildTestAssembly(new TestAssembly(new GruposPlaywrightDriver(page), [new MockApiAdapter(page)])));

    } else {
      use(new GruposPlaywrightDriver(page));
    }
  },
});