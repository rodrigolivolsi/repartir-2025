import MCR from "../../main/frontend/node_modules/monocart-coverage-reports";
import coverageOptions from "./mcr.config";
import { type FullConfig } from "../../main/frontend/node_modules/@playwright/test";

async function globalTeardown(config: FullConfig) {
  console.log("Running code coverage global teardown");
  const mcr = MCR(coverageOptions);
  await mcr.generate();
}

export default globalTeardown;
