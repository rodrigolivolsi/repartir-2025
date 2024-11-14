import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const baseURL = 'http://localhost:8080';
const gradlewPath = '../../../';
const gradlewCommand = process.platform === 'win32'
  ? 'gradlew.bat bootRun'
  : './gradlew bootRun';

const backend = {
  command: gradlewCommand,
  url: 'http://localhost:8080',
  cwd: gradlewPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

const personas = {
  command: 'npm run wiremock -- --port 8081',
  url: 'http://localhost:8081',
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: ['../../jsAcceptanceTest/steps/*', './fixtures.ts'],
  featuresRoot: '../../jsAcceptanceTest/',
});

export default defineConfig({
  testDir,
  reporter: [
    [
      'junit',
      {
        outputFile:
          '../../../build/test-results/acceptanceTestJs/TEST-acceptanceTestJs.xml',
      },
    ],
    [
      'html',
      {
        open: 'never',
        outputFolder: '../../../build/reports/playwright-reports'
      }
    ],
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: baseURL,
  },
  webServer: [backend, personas],
});
