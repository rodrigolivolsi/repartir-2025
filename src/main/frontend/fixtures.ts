import { test as base } from 'playwright-bdd';
import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { BienvenidaPlaywrightDriver } from 'test-drivers/bienvenida-playwright-driver';
import { MockApiAdapter } from 'test-drivers/mockApi-adapter';
import { GruposPlaywrightDriver } from 'test-drivers/grupos-playwright-driver';
import { TestAssembly } from 'test-drivers/assembly';
import { BienvenidaHttpDriver } from 'test-drivers/bienvenida-http-driver';
import { GruposHttpDriver } from 'test-drivers/grupos-https-driver';

export const test = base.extend<{ autoTestFixture: void, assembly: TestAssembly }>({
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
  assembly: async({page, request}, use) => {

    let testAssembly = new TestAssembly([]);

    if (process.env.API == 'mock') {
      console.log("Using mocks for the API");
      testAssembly = new TestAssembly([new MockApiAdapter(page)]);  
    } 

    if (process.env.NoBrowser == 'true') {
      testAssembly.addDriver('bienvenida', new BienvenidaHttpDriver(request));
      testAssembly.addDriver('grupos', new GruposHttpDriver(request));

    } else {
      testAssembly.addDriver('bienvenida', new BienvenidaPlaywrightDriver(page));
      testAssembly.addDriver('grupos', new GruposPlaywrightDriver(page));
    }


    use(testAssembly);
  }
});