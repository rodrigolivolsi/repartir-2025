import { defineConfig } from "../../main/frontend/node_modules/@playwright/test";
import {
  baseURL,
  frontend,
  projects,
  testDir,
} from "./playwright.config.constants";

export default defineConfig({
  testDir,
  projects,
  reporter: [
    [
      "junit",
      {
        outputFile:
          "../../../build/test-results/acceptanceTestAssemblyMockApi/TEST-acceptanceTestAssemblyMockApi.xml",
      },
    ]
  ],
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    baseURL: baseURL,
  },
  webServer: [frontend],
});
