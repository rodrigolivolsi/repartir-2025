import {
  defineConfig,
  ReporterDescription,
} from "../../main/frontend/node_modules/@playwright/test";
import { defineBddConfig } from "../../main/frontend/node_modules/playwright-bdd";
import { devices } from "../../main/frontend/node_modules/playwright/test";

const baseURL = "http://localhost:4200";

const testDir = defineBddConfig({
  features: "../features/*",
  steps: ["../steps/*", "./fixtures.ts"],
  featuresRoot: "../",
});

const reporter: ReporterDescription[] = [
  ["list"],
  [
    "junit",
    {
      outputFile:
        "../../../build/test-results/acceptanceTestJs/TEST-acceptanceTestJs.xml",
    },
  ],
];

export default defineConfig({
  testDir,
  reporter,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    baseURL,
  },
  webServer: [
    // FRONTEND
    {
      command: "npm run start",
      url: baseURL,
      cwd: "../../../src/main/frontend",
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    // BACKEND
    {
      command:
        process.platform === "win32"
          ? "gradlew.bat bootRun"
          : "./gradlew bootRun",
      url: "http://localhost:8080",
      cwd: "../../../",
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    // PERSONAS
    {
      command: "npm run wiremock -- --port 8081",
      url: "http://localhost:8081",
      cwd: "../../../src/main/frontend",
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
