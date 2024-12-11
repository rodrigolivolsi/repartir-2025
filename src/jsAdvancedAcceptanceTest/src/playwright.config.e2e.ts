import { defineConfig } from "../../main/frontend/node_modules/@playwright/test";
import {
  backend,
  baseURL,
  frontend,
  personas,
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
          "../../../build/test-results/acceptanceTestAssemblyE2E/TEST-acceptanceTestAssemblyE2E.xml",
      },
    ]
  ],
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    baseURL: baseURL,
  },
  webServer: [frontend, backend, personas],
});
