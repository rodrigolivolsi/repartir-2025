import { test as base } from 'playwright-bdd';
import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { BienvenidaDriver } from 'test-drivers/bienvenida-driver';
import { GruposDriver } from 'test-drivers/grupos-driver';
import { GruposMockApi } from 'test-drivers/grupos-mockApi-driver';
import { BienvenidaMockApi } from 'test-drivers/bienvenida-mockApi-driver';
import { BienvenidaE2E } from 'test-drivers/bienvenida-e2e-driver';
import { GruposE2E } from 'test-drivers/grupos-e2e-driver';

export const test = base.extend<{ autoTestFixture: void, bienvenida: BienvenidaDriver, grupos: GruposDriver }>({
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
  bienvenida: async({page}, use) => {

    if (process.env.API == 'mock') {
      console.log("Using mocks for the API");
      use(new BienvenidaMockApi(page));

    } else {
      use(new BienvenidaE2E(page));
    }
  },
  grupos: async({page}, use) => {
    if (process.env.API == 'mock') {
      console.log("Using mocks for the API");
      use(new GruposMockApi(page));

    } else {
      use(new GruposE2E(page));
    }
  },
});