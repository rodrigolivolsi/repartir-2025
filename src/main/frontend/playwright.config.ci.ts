import { defineConfig, ReporterDescription } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { backend, personas, projects } from 'playwright.config.constants';

const testDir = defineBddConfig({
  features: '../../jsAdvancedAcceptanceTest/features/*',
  steps: ['../../jsAdvancedAcceptanceTest/steps/*', './fixtures.ts'],
  featuresRoot: '../../jsAdvancedAcceptanceTest/',
});

const reporter: ReporterDescription[] = [
  [
    'junit',
    {
      outputFile:
        '../../../build/test-results/advancedAcceptanceTestJs/TEST-advancedAcceptanceTestJs.xml',
    },
  ],
];

export default defineConfig({
  testDir,
  reporter,
  projects,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'http://localhost:8080', // not using baseURL from playwright.config.constants.ts because its different
  },
  webServer: [backend, personas],
});
