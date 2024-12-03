import { defineBddConfig } from "../../main/frontend/node_modules/playwright-bdd";
import {
  devices,
  ReporterDescription,
} from "../../main/frontend/node_modules/playwright/test";

export const baseURL = "http://localhost:4200";
const frontendPath = "../../../src/main/frontend";
const frontendCommand = "npm run start";
const gradlewPath = "../../../";
const gradlewCommand =
  process.platform === "win32" ? "gradlew.bat bootRun" : "./gradlew bootRun";

export const frontend = {
  command: frontendCommand,
  url: baseURL,
  cwd: frontendPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

export const backend = {
  command: gradlewCommand,
  url: "http://localhost:8080",
  cwd: gradlewPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

export const personas = {
  command: "npm run wiremock -- --port 8081",
  url: "http://localhost:8081",
  cwd: frontendPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

export const projects = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
];

export const testDir = defineBddConfig({
  features: "../features/*",
  steps: ["../steps/*", "./advancedFixtures.ts"],
  featuresRoot: "../",
});

export const reporter: ReporterDescription[] = [
  [
    "junit",
    {
      outputFile:
        "../../../build/test-results/advancedAcceptanceTestJs/TEST-advancedAcceptanceTestJs.xml",
    },
  ],
];
