import { type FullConfig } from "../../main/frontend/node_modules/@playwright/test";
import MCR from "../../main/frontend/node_modules/monocart-coverage-reports";
import coverageOptions from "./mcr.config";

async function globalSetup(config: FullConfig) {
  console.log("Running code coverage global setup");
  const mcr = MCR(coverageOptions);
  await mcr.cleanCache();
}

export default globalSetup;
