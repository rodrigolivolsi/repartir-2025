import { test as base } from 'playwright-bdd';
import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { BienvenidaDriver, BienvenidaPlaywright } from 'test-drivers/bienvenida-driver';

export const test = base.extend<{ autoTestFixture: void, bienvenida: BienvenidaDriver }>({
  autoTestFixture: [async ({ page }, use) => {
    
    const isChromium = test.info().project.name === 'chromium';

    // coverage API is chromium only
    if (isChromium) {
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

    if (isChromium) {
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
    use(new BienvenidaPlaywright(page))
  },
});