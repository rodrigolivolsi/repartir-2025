import MCR from "../../main/frontend/node_modules/monocart-coverage-reports";
import { test as base } from "../../main/frontend/node_modules/playwright-bdd";
import coverageOptions from "./mcr.config";

export const test = base.extend<{ autoTestFixture: void }>({
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
});
